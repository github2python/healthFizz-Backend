const mongoose = require("mongoose");
const Prevention = require("./models/HealthData");

mongoose.connect("mongodb://localhost:27017/HealthFizz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDiseases = async () => {
  await Prevention.deleteMany(); // Clear existing data

  const diseases = [
    {
      diseaseName: "heart",
      hasRisk: true,
      steps: {
        lifestyle: ["Exercise regularly", "Reduce stress", "Quit smoking"],
        diet: [
          "Eat less salt",
          "Consume heart-healthy fats",
          "Avoid trans fats",
        ],
        behavior: ["Monitor blood pressure", "Get regular check-ups"],
        medicalGuidance: [
          "Take prescribed medication",
          "Follow up with cardiologist",
        ],
      },
    },
    {
      diseaseName: "stroke",
      hasRisk: true,
      steps: {
        lifestyle: ["Maintain healthy weight", "Stay physically active"],
        diet: ["Limit sodium intake", "Eat more fruits and vegetables"],
        behavior: ["Manage diabetes", "Quit smoking"],
        medicalGuidance: ["Take prescribed medication for hypertension"],
      },
    },
    {
      diseaseName: "diabetes",
      hasRisk: true,
      steps: {
        lifestyle: ["Exercise 30 minutes a day", "Manage stress levels"],
        diet: ["Limit sugar intake", "Consume high-fiber foods"],
        behavior: ["Monitor blood sugar regularly"],
        medicalGuidance: [
          "Follow prescribed diabetes medication",
          "Consult endocrinologist regularly",
        ],
      },
    },
    {
      diseaseName: "liver",
      hasRisk: true,
      steps: {
        lifestyle: ["Avoid alcohol", "Maintain a healthy weight"],
        diet: ["Limit fatty foods", "Increase fruit and vegetable intake"],
        behavior: [
          "Avoid risky behaviors like drug use",
          "Get vaccinated for hepatitis",
        ],
        medicalGuidance: [
          "Consult a liver specialist",
          "Get regular liver function tests",
        ],
      },
    },
  ];

  await Prevention.insertMany(diseases);
  console.log("Database seeded with diseases!");
  mongoose.connection.close();
};

seedDiseases();
