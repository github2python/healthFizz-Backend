const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // res.header("token", token).send(token);
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("token", token).send(token);
};
