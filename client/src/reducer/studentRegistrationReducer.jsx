/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as student_reg from '../constants/studentRegistrationConstant';

export const studentDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case student_reg.STUDENT_DETAIL_REQUEST:
      return { loading: true };
    case student_reg.STUDENT_DETAIL_SUCCESS:
      return { loading: false, success: true, student: action.payload };
    case student_reg.STUDENT_DETAIL_FAIL:
      return { success: false, error: action.payload };
    default:
      return state;
  }
};

export const registeredStudentListReducer = (state = {}, action) => {
  switch (action.type) {
    case student_reg.GET_ALL_REGISTERED_REQUEST:
      return { loading: true };
    case student_reg.GET_ALL_REGISTERED_SUCCESS:
      return { loading: false, registeredStudent: action.payload };
    case student_reg.GET_ALL_REGISTERED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentTestListReducer = (state = {}, action) => {
  switch (action.type) {
    case student_reg.STUDENT_TEST_LIST_REQUEST:
      return { loading: true };
    case student_reg.STUDENT_TEST_LIST_SUCCESS:
      return {
        loading: false,
        notGivenPaper: action.payload1,
        givenPaper: action.payload2,
        notGivenAssignment: action.payload3,
        givenAssignment: action.payload4,
      };
    case student_reg.STUDENT_TEST_LIST_FAIL:
      return { loading: false };
    case student_reg.STUDENT_TEST_LIST_RESET:
      return {};
    default:
      return state;
  }
};
