import express from "express";

import {
    addCollection,
    getAllCollections,
    getCollectionById,
    getCollectionStatusHistory,
    updateLorryRegNum,
    updateMaterialName,
    updateCustomerName,
    updateCollectionRefNum,
    updateCollectionStatus,
    deleteCollection
} from "../controllers/collection.controller.js";

const router = express.Router();

// Create collection
router.post("/", addCollection);

// Read collections
router.get("/", getAllCollections);
router.get("/:collectionId", getCollectionById);
router.get("/:collectionId/history", getCollectionStatusHistory);

// Update collection fields
router.patch("/:collectionId/registration-number", updateLorryRegNum);
router.patch("/:collectionId/material-name", updateMaterialName);
router.patch("/:collectionId/customer-name", updateCustomerName);
router.patch("/:collectionId/reference-number", updateCollectionRefNum);
router.patch("/:collectionId/status", updateCollectionStatus);

// Delete collection
router.delete("/:collectionId", deleteCollection);

export default router;
