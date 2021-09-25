/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const { User } = require("../models/user");
const jwtPrivateKey = "KETIK KATA APA SAJA"

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const { validateSignin } = require("../services/validation");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Email dan password tidak valid");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send("Email dan password tidak valid");

  if (user.category === "TEACHER" && user.teacherPerm === false) {
    return res.status(403).send("Izin tydack diberikan");
  }

  const token = jwt.sign({ _id: user._id }, jwtPrivateKey);

  res.json({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    category: user.category,
  });
});

module.exports = router;
