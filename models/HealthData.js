const mongoose = require("mongoose");

const PreventionSchema = new mongoose.Schema({
  diseaseName: {
    type: String,
    required: true,
  },
  hasRisk: {
    type: Boolean,
    required: true,
    default: false,
  },
  steps: {
    lifestyle: {
      type: [String], // Array of steps related to lifestyle
      required: true,
    },
    diet: {
      type: [String], // Array of steps related to diet
      required: true,
    },
    behavior: {
      type: [String], // Array of behavioral recommendations
      required: true,
    },
    medicalGuidance: {
      type: [String], // Array of medical recommendations
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Prevention = mongoose.model("Prevention", PreventionSchema);

module.exports = Prevention;
