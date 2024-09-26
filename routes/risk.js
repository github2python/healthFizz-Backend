const express = require("express");

const router = express.Router();
const {
  heartRisk,
  liverRisk,
  strokeRisk,
  diabetesRisk,
} = require("../controllers/riskController");

router.post("/heart/:email", heartRisk);
router.post("/liver/:email", liverRisk);
router.post("/stroke/:email", strokeRisk);
router.post("/diabetes/:email", diabetesRisk);

module.exports = router;
