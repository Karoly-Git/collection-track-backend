const express = require("express");
const router = express.Router();

const {
    getAllLorries, getLorryById, getLorryStatusHistory, addLorry, updateLorryStatus
} = require("../controllers/lorry.controller");

router.get("/", getAllLorries);
router.post("/", addLorry);

router.get("/:id", getLorryById);
router.put("/:id", updateLorryStatus);
router.get("/:id/history", getLorryStatusHistory);

module.exports = router;