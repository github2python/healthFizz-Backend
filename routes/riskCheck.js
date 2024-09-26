const express = require("express");

const router = express.Router();
const { diseaseRisk } = require("../controllers/diseaseController");

router.get("/risk/:email", diseaseRisk);

module.exports = router;
