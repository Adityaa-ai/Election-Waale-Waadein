const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findUserByEmail(email);
  if (userExists) return res.status(400).json({ msg: "User already exists" });

  const user = await userModel.createUser(name, email, password);

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json(user);
};