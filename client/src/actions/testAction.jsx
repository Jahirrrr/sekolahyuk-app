/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as test from '../constants/testConstant';
import http from '../utils/httpService';
import { toast } from 'react-toastify';
import Token from '../utils/Token';
import errorHandler from '../errorHandler';

export const createTest = testPaper => async dispatch => {
  try {
    const { data } = await http.post('/api/test/create', testPaper, Token());

    if (testPaper.paperType !== 'TUGAS')
      dispatch(getNotConductedTestPaper());
    else dispatch(getNotConductedAssignment());
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getNotConductedTestPaper = () => async dispatch => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });

    let { data } = await http.get('/api/test/details/all', Token());
    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload1: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};
export const getNotConductedAssignment = () => async dispatch => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });

    let { data } = await http.get('/api/test/assignment/details/all', Token());

    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload3: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getConductedTestPaper = () => async dispatch => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });
    let { data } = await http.get('/api/test/conducted/details/all', Token());

    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      //payload1: notConductedTestPapers,
      payload2: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getConductedAssignment = () => async dispatch => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });
    let { data } = await http.get(
      '/api/test/assignment/conducted/details/all',
      Token()
    );

    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    dispatch({
      type: test.TEST_LIST_SUCCESS,
      //payload1: notConductedTestPapers,
      payload4: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const testPaperDelete = (testPapers, id, show) => async dispatch => {
  try {
    const { data } = await http.post('/api/test/delete', { id }, Token());

    const arr = testPapers.filter(t => t._id !== id);

    if (show) {
      dispatch({ type: test.TEST_LIST_SUCCESS, payload1: arr });
    } else {
      dispatch({ type: test.TEST_LIST_SUCCESS, payload2: arr });
    }

    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const testBegin = (id, index, testPapers) => async dispatch => {
  try {
    await http.post('/api/test/begin', { id }, Token());

    const arr = [...testPapers];
    arr[index].isTestBegins = true;
    arr[index].isRegistrationAvailable = false;

    if (arr[index].paperType !== 'TUGAS') {
      dispatch({
        type: test.TEST_LIST_SUCCESS,
        payload1: arr,
      });
    } else {
      dispatch({
        type: test.TEST_LIST_SUCCESS,
        payload3: arr,
      });
    }

    toast.success('test has been started');
  } catch (ex) {
    errorHandler(ex);
  }
};

export const testEnd = async ({ testId, studentId }) => {
  try {
    const { data } = await http.post(
      '/api/student/endTest',
      {
        testId,
        studentId,
      },
      Token()
    );

    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const testEndByTeacher = (testPapers, id) => async dispatch => {
  try {
    const { data } = await http.post('/api/test/end', { id }, Token());

    const arr1 = testPapers.filter(t => t._id !== id);
    const arr2 = testPapers.filter(t => t._id === id);

    if (arr2[0].paperType !== 'TUGAS') {
      dispatch({
        type: test.TEST_LIST_SUCCESS,
        payload1: arr1,
      });
      dispatch(getConductedTestPaper());
    } else {
      dispatch(getConductedAssignment());
      //dispatch(getNotConductedAssignment());
      dispatch({
        type: test.TEST_LIST_SUCCESS,
        payload3: arr1,
      });
    }

    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getSinglePaper = id => async dispatch => {
  try {
    dispatch({ type: test.SINGLE_TESTPAPER_REQUEST });

    const { data } = await http.post('/api/student/questions', { id }, Token());

    dispatch({
      type: test.SINGLE_TESTPAPER_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const checkTestStart = async id => {
  try {
    const { data } = await http.post(
      '/api/test/check-test-start',
      { id },
      Token()
    );
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getTestDetails = async id => {
  try {
    const { data } = await http.get(`/api/test/get/${id}`, Token());
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
export const startTestTime = async testId => {
  try {
    const { data } = await http.post(
      '/api/student/test/start-time',
      {
        testId,
      },
      Token()
    );
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getTestCategory = async testId => {
  try {
    const { data } = await http.post(
      '/api/student/test/category',
      { testId },
      Token()
    );
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getScoreOfAllStudents = async testId => {
  try {
    const { data } = await http.post(
      '/api/result/all/score',
      { testId },
      Token()
    );
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
