/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import http from '../utils/httpService';
import errorHandler from '../errorHandler';
import Token from '../utils/Token';

export const uploadAudio = async (testId, studentId, audioRecording) => {
  try {
    const { data } = await http.post(
      '/api/audio/upload',
      {
        testId,
        studentId,
        audioRecording,
      },
      Token()
    );
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getAllAudioRec = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      '/api/audio/get/all',
      {
        testId,
        studentId,
      },
      Token()
    );
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
