const express = require("express");
const router = express.Router();
const { preventions } = require("../controllers/healthController");

router.get("/steps/:diseaseName", preventions);
module.exports = router;
