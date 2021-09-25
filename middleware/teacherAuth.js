/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */

module.exports = function (req, res, next) {
  if (req.user.category !== "TEACHER" || req.user.teacherPerm === false) {
    return res.status(403).send("Izin tydack diperbolehkan");
  }
  next();
};
