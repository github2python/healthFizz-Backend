const mongoose = require("mongoose");
const User = require("./models/User");
const Prediction = require("./models/RiskAssessment");
require("dotenv").config();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Delete all users
const deleteAllUsers = async () => {
  try {
    await User.deleteMany({});

    console.log("All users deleted");
  } catch (err) {
    console.error("Error deleting users:", err);
  }
};

const deleteAllPrediction = async () => {
  try {
    await Prediction.deleteMany({});

    console.log("All predictions deleted");
  } catch (err) {
    console.error("Error deleting predictions:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
const runSeeder = async () => {
  await connectDB();
  await deleteAllUsers();
  await deleteAllPrediction();
};

runSeeder();
