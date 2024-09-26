const mongoose = require("mongoose");

const RiskAssessmentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  riskScores: {
    heart: Number,
    stroke: Number,
    diabetes: Number,
    liver: Number,
  },
  // Define other necessary fields
});

module.exports = mongoose.model("RiskAssessment", RiskAssessmentSchema);
