const Prevention = require("../models/HealthData"); // Import the Prevention model

// Controller function to handle prevention steps request
exports.preventions = async (req, res) => {
  try {
    // Get the disease name from the request params
    const { diseaseName } = req.params;
    // console.log(diseaseName);

    // Find the prevention steps for the specific disease in the database
    const prevention = await Prevention.findOne({ diseaseName });
    // console.log(prevention);
    // If no prevention steps are found, return a 404 error
    if (!prevention) {
      return res.status(404).json({
        message: "Prevention steps not found for the specified disease",
      });
    }

    // Return the prevention steps for the requested disease
    res.status(200).json(prevention.steps);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching prevention steps:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching prevention steps" });
  }
};
