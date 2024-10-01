const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { where } = require("sequelize");
const { jwtSecret } = process.env;

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hasedPassword,
      role: role || "user",
      blacklisted: false,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.blacklisted) {
      return res.status(404).json({ message: 'Invalid Credentials or User Blacklisted' });
    }
   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) {
     return res.status(404).json({ message: 'Invalid Credentials' });
   }
   const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d'});
   res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
