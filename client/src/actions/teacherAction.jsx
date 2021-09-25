/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as s from '../constants/teacherConstant';
import http from '../utils/httpService';
import { toast } from 'react-toastify';
import errorHandler from '../errorHandler';
import Token from '../utils/Token';

export const teacherList = () => async dispatch => {
  try {
    dispatch({ type: s.TEACHER_LIST_REQUEST });
    const { data } = await http.get(
      '/api/teacher/auth/details/all',
      Token()
    );

    dispatch({
      type: s.TEACHER_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};
export const teacherReqList = () => async dispatch => {
  try {
    dispatch({ type: s.TEACHER_REQ_LIST_REQUEST });

    const { data } = await http.get(
      '/api/teacher/request/details/all',
      Token()
    );

    dispatch({
      type: s.TEACHER_REQ_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const removeTeacher = (
  teacher,
  id,
  permission
) => async dispatch => {
  try {
    const { data } = await http.delete(`/api/teacher/remove/${id}`, Token());

    const arr = teacher.filter(s => s._id !== id);
    if (permission === true) {
      dispatch({ type: s.TEACHER_LIST_SUCCESS, payload: arr });
    } else {
      dispatch({ type: s.TEACHER_REQ_LIST_SUCCESS, payload: arr });
    }
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const updateTeacher = (teacher, status) => async (
  dispatch,
  getState
) => {
  //console.log(supervisor);
  const id = teacher._id;
  try {
    dispatch({ type: s.TEACHER_UPDATEPERM_REQUEST });
    const {
      teacherList: { teacher },
      teacherReqList: { teacher: requests },
    } = getState();

    const { data } = await http.post(
      `/api/teacher/change/permission`,
      { id, status },
      Token()
    );

    dispatch({
      type: s.TEACHER_UPDATEPERM_SUCCESS,
    });

    if (status === true) {
      const arr = requests.filter(s => s._id !== id);
      dispatch({ type: s.TEACHER_REQ_LIST_SUCCESS, payload: arr });
      dispatch({
        type: s.TEACHER_LIST_SUCCESS,
        payload: [...teacher, teacher],
      });
    } else {
      const arr = teacher.filter(s => s._id !== id);
      dispatch({ type: s.TEACHER_LIST_SUCCESS, payload: arr });
      dispatch({
        type: s.TEACHER_REQ_LIST_SUCCESS,
        payload: [...requests, teacher],
      });
    }
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const deleteMedia = async () => {
  try {
    const { data } = await http.delete(`/api/teacher/delete/media`, Token());
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};
