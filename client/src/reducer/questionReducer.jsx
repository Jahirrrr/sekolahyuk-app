/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as question from '../constants/questionConstant';

export const questionListReducer = (state = {}, action) => {
  switch (action.type) {
    case question.QUESTION_LIST_REQUEST:
      return { loading: true };
    case question.QUESTION_LIST_SUCCESS:
      return { loading: false, questions: action.payload };
    case question.QUESTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    case question.QUESTION_LIST_RESET:
      return {};
    default:
      return state;
  }
};
