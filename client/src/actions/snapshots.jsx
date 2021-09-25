/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import http from '../utils/httpService';
import errorHandler from '../errorHandler';
import Token from '../utils/Token';

export const uploadImage = async (testId, studentId, image) => {
  try {
    const { data } = await http.post(
      '/api/snapshot/upload',
      {
        testId,
        studentId,
        image,
      },
      Token()
    );
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getAllImages = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      '/api/snapshot/get/all',
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
