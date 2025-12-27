const express = require("express");
const router = express.Router();

const {
    getAllLorries, getLorryById, getLorryStatusHistory, addLorry
} = require("../controllers/lorry.controller");

router.get("/", getAllLorries);
router.post("/", addLorry);

router.get("/:id", getLorryById);
router.get("/:id/history", getLorryStatusHistory);

module.exports = router;