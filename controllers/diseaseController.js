axios = require("axios");
const RiskAssessment = require("../models/RiskAssessment");

exports.diseaseRisk = async (req, res) => {
  const { email } = req.params;
  // console.log(email);
  try {
    const riskAssessment = await RiskAssessment.findOne({ email });
    // console.log(riskAssessment);
    if (!riskAssessment) {
      return res.status(400).json({ error: "Risk assessment not found" });
    } else {
      res.json(riskAssessment);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
