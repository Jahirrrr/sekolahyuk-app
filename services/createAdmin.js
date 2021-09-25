/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


var {User} = require("../models/user");
const bcrypt = require("bcrypt");

var createadmin = async () => {
  const user = new User({
    name: "admin",
    password: "sekolahyukapp",
    email: "admin@sekolahyuk.id",
    category: "ADMIN",
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  console.log("Akun admin berhasil dibuat");
};

module.exports = createadmin;
