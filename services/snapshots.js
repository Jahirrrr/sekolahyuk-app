/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const Snapshots = require("../models/snapshots");

const uploadImage = async (req, res) => {
  const { testId, studentId, image } = req.body;
  let snapshots = await Snapshots.findOneAndUpdate(
    { testId, studentId },
    { $push: { images: image } }
  );
  if (!snapshots) {
    const images = [];
    images.push(image);
    snapshots = new Snapshots({
      testId,
      studentId,
      images,
    });
    await snapshots.save();
  }
  res.send("Gambar berhasil diupload");
};

const getImages = async (req, res) => {
  const { testId, studentId } = req.body;
  const snapshots = await Snapshots.findOne({ testId, studentId });
  if (!snapshots) return res.status(404).send("Gambar tydack ditemukan");

  res.send(snapshots.images);
};

module.exports = { uploadImage, getImages };
