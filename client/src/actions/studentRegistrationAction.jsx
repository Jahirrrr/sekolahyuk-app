/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as student_reg from '../constants/studentRegistrationConstant';
import * as test from '../constants/testConstant';
import http from '../utils/httpService';
import Token from '../utils/Token';
import errorHandler from '../errorHandler';
import { toast } from 'react-toastify';

export const studentRegistrationForTest = async (students, history) => {
  try {
    const testId = students.testId;
    const { data } = await http.post('/api/student/register', students);
    toast.success(data);
    history.push(`/student/registration/test/${testId}/emailsent`);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const openRegistrationforTest = ({
  testPapers,
  id,
  status,
}) => async dispatch => {
  try {
    const { data } = await http.post(
      '/api/test/change-registration-status',
      { id, status },
      Token()
    );

    const arr = [...testPapers];
    const index = arr.findIndex(test => test._id === id);

    arr[index].isRegistrationAvailable = status;

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload1: arr,
    });
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getStudentDetail = id => async dispatch => {
  try {
    dispatch({ type: student_reg.STUDENT_DETAIL_REQUEST });

    const { data } = await http.post('/api/student/details', { id }, Token());

    dispatch({
      type: student_reg.STUDENT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const downloadResult = async testId => {
  try {
    const { data } = await http.post(
      '/api/result/download',
      { testId },
      Token()
    );
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getAllRegisteredStudent = testId => async dispatch => {
  try {
    dispatch({ type: student_reg.GET_ALL_REGISTERED_REQUEST });

    const { data } = await http.post(
      '/api/test/students/all',
      { testId },
      Token()
    );

    dispatch({
      type: student_reg.GET_ALL_REGISTERED_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const studentsPrevPaper = async () => {
  try {
    const { data } = await http.get('/api/student/previous-paper', Token());

    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const studentTestPaperList = () => async dispatch => {
  try {
    dispatch({ type: student_reg.STUDENT_TEST_LIST_REQUEST });

    let { data } = await http.get('/api/student/alltest', Token());

    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    const paper1 = data.filter(
      p => !p.isTestConducted && p.paperType !== 'TUGAS'
    );
    const paper2 = data.filter(
      p => p.isTestConducted && p.paperType !== 'TUGAS'
    );
    const paper3 = data.filter(
      p => !p.isTestConducted && p.paperType === 'TUGAS'
    );
    const paper4 = data.filter(
      p => p.isTestConducted && p.paperType === 'TUGAS'
    );

    dispatch({
      type: student_reg.STUDENT_TEST_LIST_SUCCESS,
      payload1: paper1,
      payload2: paper2,
      payload3: paper3,
      payload4: paper4,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};
export const getStudentRecord = async studentId => {
  try {
    const { data } = await http.post(
      '/api/result/student/all',
      { studentId },
      Token()
    );
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
