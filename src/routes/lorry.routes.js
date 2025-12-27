const express = require("express");
const router = express.Router();

const { getAllLorries, getLorryById } = require("../controllers/lorry.controller");

router.get("/lorries", getAllLorries);
router.get("/:id", getLorryById);

module.exports = router;