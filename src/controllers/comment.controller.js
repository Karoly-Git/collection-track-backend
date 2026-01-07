import data from "../__mocks__/collection.data.js";
import COLLECTION_STATUSES from "../constants/collection-statuses.js";

/**
 * ─────────────────────────────────────────────────────────────
 * Helpers
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Helper: find comment with references
 */
const findCommentById = (commentId) => {
    for (const collection of data) {
        for (const history of collection.statusHistory) {
            const index = history.comments.findIndex(c => c.id === commentId);
            if (index !== -1) {
                return {
                    collection,
                    history,
                    comment: history.comments[index],
                    commentIndex: index
                };
            }
        }
    }
    return null;
};

/**
 * Helper: validate required params/body and send 400 if missing
 */
const validateRequiredFields = (req, res, requiredKeys = []) => {
    const source = { ...req.params, ...req.body };

    const missingFields = requiredKeys.filter(
        field =>
            source[field] === undefined ||
            source[field] === null ||
            (typeof source[field] === "string" && !source[field].trim())
    );

    if (!missingFields.length) return false;

    return res.status(400).json({
        message: `Missing required field(s): '${missingFields.join(", ")}'`
    });
};

/**
 * ─────────────────────────────────────────────────────────────
 * Controllers
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Add comment to a collection status
 */
export const addComment = (req, res) => {
    if (validateRequiredFields(req, res, ["collectionId", "status", "userId", "text"])) return;

    const { collectionId, status } = req.params;
    const { userId, text } = req.body;

    if (!Object.values(COLLECTION_STATUSES).includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    const collection = data.find(c => c.id === collectionId);
    if (!collection) {
        return res.status(404).json({ message: `Collection with ID '${collectionId}' not found` });
    }

    const statusEntry = collection.statusHistory.find(s => s.status === status);
    if (!statusEntry) {
        return res.status(404).json({
            message: `Status '${status}' not found for collection with ID '${collectionId}'`
        });
    }

    const newComment = {
        id: `c-${Date.now()}`,
        userId,
        text,
        timestamp: new Date().toISOString()
    };

    statusEntry.comments.push(newComment);

    return res.status(201).json(newComment);
};

/**
 * Get all comments of a specific status of a collection
 */
export const getAllComments = (req, res) => {
    if (validateRequiredFields(req, res, ["collectionId", "status"])) return;

    const { collectionId, status } = req.params;

    const collection = data.find(c => c.id === collectionId);
    if (!collection) {
        return res.status(404).json({
            message: `Collection with ID '${collectionId}' not found`
        });
    }

    const statusEntry = collection.statusHistory.find(s => s.status === status);
    if (!statusEntry) {
        return res.status(404).json({
            message: `Status '${status}' not found for collection with ID '${collectionId}'`
        });
    }

    return res.status(200).json(statusEntry.comments);
};

/**
 * Get single comment
 */
export const getSingleComment = (req, res) => {
    if (validateRequiredFields(req, res, ["commentId"])) return;

    const { commentId } = req.params;

    const result = findCommentById(commentId);
    if (!result) {
        return res.status(404).json({
            message: `Comment with ID '${commentId}' not found`
        });
    }

    return res.status(200).json(result.comment);
};

/**
 * Update a comment
 */
export const updateComment = (req, res) => {
    if (validateRequiredFields(req, res, ["commentId", "text"])) return;

    const { commentId } = req.params;
    const { text } = req.body;

    const result = findCommentById(commentId);
    if (!result) {
        return res.status(404).json({
            message: `Comment with ID '${commentId}' not found`
        });
    }

    result.comment.text = text;
    result.comment.timestamp = new Date().toISOString();

    return res.status(200).json(result.comment);
};


/**
 * Delete a comment
 */
export const deleteComment = (req, res) => {
    if (validateRequiredFields(req, res, ["commentId"])) return;

    const { commentId } = req.params;

    const result = findCommentById(commentId);
    if (!result) {
        return res.status(404).json({
            message: `Comment with ID '${commentId}' not found`
        });
    }

    result.history.comments.splice(result.commentIndex, 1);

    return res.status(200).json({
        message: `Comment with ID '${commentId}' deleted successfully`
    });
};
