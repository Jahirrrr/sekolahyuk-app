/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const AudioRec = require("../models/audio");

const uploadAudio = async (req, res) => {
  const { testId, studentId, audioRecording } = req.body;
  let audio = await AudioRec.findOneAndUpdate(
    { testId, studentId },
    { $push: { audioRec: audioRecording } }
  );
  if (!audio) {
    const audioRec = [];
    audioRec.push(audioRecording);
    audio = new AudioRec({
      testId,
      studentId,
      audioRec,
    });
    await audio.save();
  }
  res.send("Berhasil diupload");
};

const getAudio = async (req, res) => {
  const { testId, studentId } = req.body;
  const audio = await AudioRec.findOne({ testId, studentId });
  if (!audio) return res.status(404).send("Rekaman audio tydack ditemukan");

  res.send(audio.audioRec);
};

module.exports = { uploadAudio, getAudio };
