/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */

module.exports = function (req, res, next) {
  if (req.user.category !== "ADMIN") {
    return res.status(403).send("Akses tydack diperbolehkan");
  }
  next();
};
