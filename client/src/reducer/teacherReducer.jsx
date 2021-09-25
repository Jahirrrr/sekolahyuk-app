/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as s from '../constants/teacherConstant';

export const getTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case s.TEACHER_LIST_REQUEST:
      return { loading: true };
    case s.TEACHER_LIST_SUCCESS:
      return { loading: false, teacher: action.payload };
    case s.TEACHER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTeacherReqReducer = (state = {}, action) => {
  switch (action.type) {
    case s.TEACHER_REQ_LIST_REQUEST:
      return { loading: true };
    case s.TEACHER_REQ_LIST_SUCCESS:
      return { loading: false, teacher: action.payload };
    case s.TEACHER_REQ_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case s.TEACHER_UPDATEPERM_REQUEST:
      return { loading: true };
    case s.TEACHER_UPDATEPERM_SUCCESS:
      return { loading: false, teacher: action.payload };
    case s.TEACHER_UPDATEPERM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
