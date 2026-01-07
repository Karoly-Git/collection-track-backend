import express from "express";

import {
    addComment,
    getAllComments,
    getSingleComment,
    updateComment,
    deleteComment
} from "../controllers/comment.controller.js";

const router = express.Router();

// Create
router.post("/collection/:collectionId/status/:status", addComment);

// Read
router.get("/collection/:collectionId/status/:status", getAllComments);
router.get("/:commentId", getSingleComment);

// Update
router.patch("/:commentId", updateComment);

// Delete
router.delete("/:commentId", deleteComment);

export default router;
