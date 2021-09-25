/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as test from '../constants/testConstant';

export const getTestPaperReducer = (state = {}, action) => {
  switch (action.type) {
    case test.TEST_LIST_REQUEST:
      return { loading: true };
    case test.TEST_LIST_SUCCESS: {
      return {
        loading: false,
        notConductedTestPapers: action.payload1,
        conductedTestPapers: action.payload2,
        notConductedAssignment: action.payload3,
        conductedAssignment: action.payload4,
      };
    }
    case test.TEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    case test.TEST_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleTestPaperReducer = (state = {}, action) => {
  switch (action.type) {
    case test.SINGLE_TESTPAPER_REQUEST:
      return { loading: true };
    case test.SINGLE_TESTPAPER_SUCCESS:
      return { loading: false, success: true, paper: action.payload };
    case test.SINGLE_TESTPAPER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
