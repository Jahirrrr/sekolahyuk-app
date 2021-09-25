/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const { User } = require("../models/user");

const bcrypt = require("bcrypt");

const express = require("express");
const { validateSignup } = require("../services/validation");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password, category } = req.body;

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).send("User sudah terdaftar");

  user = new User({ name, email, password, category });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send("Berhasil masuk");
});

module.exports = router;
