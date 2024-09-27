axios = require("axios");
const RiskAssessment = require("../models/RiskAssessment");

exports.heartRisk = async (req, res) => {
  try {
    // console.log(req.body);
    const response = await axios.post(
      "https://healthfizz-backend-flask.onrender.com/predict/heart",
      req.body
    );
    // console.log(response);

    const { email } = req.params;
    const risk = await RiskAssessment.findOne({ email: email });
    // console.log(risk);
    if (!risk) {
      try {
        const Risk = new RiskAssessment({
          email: email,
          riskScores: {
            heart: response.data.prediction,
          },
        });
        await Risk.save();
        // let temp = await RiskAssessment.findOne({ Email: email });
        // console.log(temp);
      } catch (error) {
        console.error("Error saving risk assessment:", error.message);
      }
    } else {
      risk.riskScores.heart = response.data.prediction;
      // console.log(risk);
      await risk.save();
    }
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error getting prediction:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.diabetesRisk = async (req, res) => {
  try {
    const response = await axios.post(
      "https://healthfizz-backend-flask.onrender.com/predict/diabetes",
      req.body
    );
    const { email } = req.params;
    const risk = await RiskAssessment.findOne({
      email: email,
    });
    if (!risk) {
      try {
        const Risk = new RiskAssessment({
          email: email,
          riskScores: {
            diabetes: response.data.prediction,
          },
        });
        await Risk.save();
      } catch (error) {
        console.error("Error saving risk assessment:", error.message);
      }
    } else {
      risk.riskScores.diabetes = response.data.prediction;
      await risk.save();
    }
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error getting prediction:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.strokeRisk = async (req, res) => {
  try {
    const response = await axios.post(
      "https://healthfizz-backend-flask.onrender.com/predict/stroke",
      req.body
    );
    const { email } = req.params;
    const risk = await RiskAssessment.findOne({ email: email });
    if (!risk) {
      try {
        const Risk = new RiskAssessment({
          email: email,
          riskScores: {
            stroke: response.data.prediction,
          },
        });
        await Risk.save();
      } catch (error) {
        console.error("Error saving risk assessment:", error.message);
      }
    } else {
      risk.riskScores.stroke = response.data.prediction;
      await risk.save();
    }
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error getting prediction:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.liverRisk = async (req, res) => {
  try {
    const response = await axios.post(
      "https://healthfizz-backend-flask.onrender.com/predict/liver",
      req.body
    );
    const { email } = req.params;
    const risk = await RiskAssessment.findOne({
      email: email,
    });
    if (!risk) {
      try {
        const Risk = new RiskAssessment({
          email: email,
          riskScores: {
            liver: response.data.prediction,
          },
        });
        await Risk.save();
      } catch (error) {
        console.error("Error saving risk assessment:", error.message);
      }
    } else {
      risk.riskScores.liver = response.data.prediction;
      await risk.save();
    }
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error getting prediction:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
};
