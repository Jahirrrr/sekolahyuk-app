/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const { User } = require("../models/user");
const Snapshots = require("../models/snapshots");
const AudioRec = require("../models/audio");

const getAllAuthTeacher = async (req, res) => {
  const teacher = await User.find({
    category: "TEACHER",
    teacherPerm: true,
  })
    .select("-password -category")
    .sort("-createdAt");
  res.send(teacher);
};
const getAllReqTeacher = async (req, res) => {
  const teacher = await User.find({
    category: "TEACHER",
    teacherPerm: false,
  })
    .select("-password -category")
    .sort("-createdAt");
  res.send(teacher);
};

const removeTeacher = async (req, res) => {
  const teacher = await User.findOne({
    _id: req.params.id,
    category: "TEACHER",
  });
  if (!teacher) return res.status(404).send("Guru tydack ditemukan");
  await teacher.remove();
  res.send("Berhasil dihapus");
};

const updateTeacherPerm = async (req, res) => {
  const { id, status } = req.body;
  const teacher = await User.findOneAndUpdate(
    { _id: id, category: "TEACHER" },
    { teacherPerm: status }
  );
  if (!teacher) return res.status(404).send("Guru tydack ditemukan");
  res.send("Izin guru diperbarui");
};

const deleteMedia = async (req, res) => {
  const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); //30 hari
  //console.log(date);
  const snapshots = await Snapshots.deleteMany({ createdAt: { $lt: date } });
  const audioRec = await AudioRec.deleteMany({ createdAt: { $lt: date } });

  res.send("Berhasil dihapus");
};

module.exports = {
  removeTeacher,
  getAllAuthTeacher,
  getAllReqTeacher,
  updateTeacherPerm,
  deleteMedia,
};
