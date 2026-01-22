import data from "../__mocks__/collection.data.js";
import COLLECTION_STATUSES from "../constants/collection-statuses.js";

/**
 * ─────────────────────────────────────────────────────────────
 * Helpers
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Find collection by ID
 */
const findCollectionById = (collectionId) =>
    data.find(c => c.id === collectionId) || null;

/**
 * Status validator
 */
const isValidStatus = (status) =>
    Object.values(COLLECTION_STATUSES).includes(status);

/**
 * Validate required fields (params + body)
 * Sends 400 response if missing
 */
const validateRequiredFields = (req, res, requiredKeys = []) => {
    const source = { ...req.params, ...req.body };

    const missingFields = requiredKeys.filter(key => {
        const value = source[key];
        return (
            value === undefined ||
            value === null ||
            (typeof value === "string" && !value.trim())
        );
    });

    if (!missingFields.length) return false;

    res.status(400).json({
        message: `Missing required field(s) or param(s): '${missingFields.join(", ")}'`
    });

    return true;
};

/**
 * ─────────────────────────────────────────────────────────────
 * Controllers
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Add new collection
 */
export const addCollection = (req, res) => {
    if (
        validateRequiredFields(req, res, [
            "materialName",         // required body field
            "customerName",         // required body field
            "collectionRefNum",    // required body field   
            "updatedByUserId",    // required body field
            //"comment"           // optional body field
        ])
    ) return;

    const {
        materialName,
        customerName,
        collectionRefNum,
        lorryRegNum,
        updatedByUserId,
        comment
    } = req.body;

    const timestamp = new Date().toISOString();
    const newId = String(data.length + 1) + new Date().getTime();

    const newCollection = {
        id: newId,
        materialName,
        customerName,
        collectionRefNum,
        lorryRegNum,
        checkedInAt: timestamp,
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp,
                updatedByUserId,
                comments: comment
                    ? [
                        {
                            id: `c-${Date.now()}`,
                            userId: updatedByUserId,
                            text: comment,
                            timestamp
                        }
                    ]
                    : []
            }
        ]
    };

    data.push(newCollection);
    return res.status(201).json(newCollection);
};

/**
 * Get all collections
 */
export const getAllCollections = (req, res) => {
    return res.status(200).json(data);
};

/**
 * Get single collection
 */
export const getCollectionById = (req, res) => {
    if (validateRequiredFields(req, res, ["collectionId"])) return;

    const { collectionId } = req.params;
    const collection = findCollectionById(collectionId);

    if (!collection) {
        return res.status(404).json({
            message: `Collection with ID '${collectionId}' not found`
        });
    }

    return res.status(200).json(collection);
};

/**
 * Get collection status history
 */
export const getCollectionStatusHistory = (req, res) => {
    if (validateRequiredFields(req, res, ["collectionId"])) return;

    const { collectionId } = req.params;
    const collection = findCollectionById(collectionId);

    if (!collection) {
        return res.status(404).json({
            message: `Collection with ID '${collectionId}' not found`
        });
    }

    return res.status(200).json(collection.statusHistory);
};

/**
 * Generic updater for simple fields
 */
const updateCollectionField = (field) => (req, res) => {
    if (validateRequiredFields(req, res, ["collectionId", field])) return;

    const { collectionId } = req.params;
    const collection = findCollectionById(collectionId);

    if (!collection) {
        return res.status(404).json({
            message: `Collection with ID '${collectionId}' not found`
        });
    }

    collection[field] = req.body[field];
    return res.status(200).json(collection);
};

export const updateMaterialName = updateCollectionField("materialName");
export const updateCustomerName = updateCollectionField("customerName");
export const updateCollectionRefNum = updateCollectionField("collectionRefNum");
export const updateLorryRegNum = updateCollectionField("lorryRegNum");

/**
 * Update collection status
 */
export const updateCollectionStatus = (req, res) => {
    const { collectionId } = req.params;
    const { newStatus, updatedByUserId, comment, timestamp } = req.body;

    //console.log(collectionId, "|", status, "|", updatedByUserId, "|", comment);

    if (
        validateRequiredFields(req, res, [
            "collectionId",             // required param
            "newStatus",                // required body field
            "updatedByUserId",          // required body field
            //"comment"                 // optional body field   
            "timestamp"
        ])
    ) return;


    if (!isValidStatus(newStatus)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    const collection = findCollectionById(collectionId);
    if (!collection) {
        return res.status(404).json({
            message: `Collection with ID '${collectionId}' not found`
        });
    }

    if (collection.currentStatus === newStatus) {
        return res.status(409).json({
            message: `Status '${newStatus}' already applied`
        });
    }

    console.log(newStatus);

    collection.currentStatus = newStatus;

    switch (newStatus) {
        case COLLECTION_STATUSES.LOADING:
            collection.startedLoadingAt = timestamp;
            break;
        case COLLECTION_STATUSES.LOADED:
            collection.finishedLoadingAt = timestamp;
            break;
        case COLLECTION_STATUSES.CHECKED_OUT:
            collection.checkedOutAt = timestamp;
            break;
        default:
            break;
    };

    collection.statusHistory.push({
        status: newStatus,
        timestamp,
        updatedByUserId,
        comments: comment
            ? [
                {
                    id: `comment-${timestamp}`,
                    userId: updatedByUserId,
                    text: comment,
                    timestamp
                }
            ]
            : []
    });

    return res.status(200).json(collection);
};

/**
 * Delete collection
 */
export const deleteCollection = (req, res) => {
    if (validateRequiredFields(req, res, ["collectionId"])) return;

    const { collectionId } = req.params;
    const index = data.findIndex(c => c.id === collectionId);

    if (index === -1) {
        return res.status(404).json({
            message: `Collection with ID '${collectionId}' not found`
        });
    }

    data.splice(index, 1);
    return res.status(200).json({ message: "Collection deleted" });
};
