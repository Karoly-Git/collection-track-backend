const express = require("express");
const router = express.Router();

const {
    getAllLorries,
    getLorryById,
    getLorryStatusHistory,
    addLorry,
    updateLorryStatus,
    updateCollectionRefNum,
    updateRegNum,
    deleteLorry
} = require("../controllers/lorry.controller");

// Creata
router.post("/", addLorry);

// Read
router.get("/", getAllLorries);
router.get("/:id", getLorryById);
router.get("/:id/history", getLorryStatusHistory);

// Update
router.put("/:id/update-status", updateLorryStatus);
router.put("/:id/update-collection-reference-number", updateCollectionRefNum);
router.put("/:id/update-registration-number", updateRegNum);

// Delete
router.delete("/:id/delete", deleteLorry);

module.exports = router;