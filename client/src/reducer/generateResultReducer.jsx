/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as gen_result from '../constants/generateResultConstant';

export const generateResultReducer = (state = {}, action) => {
  switch (action.type) {
    case gen_result.GENERATE_RESULT_REQUEST:
      return { loading: true };
    case gen_result.GENERATE_RESULT_SUCCESS:
      return { loading: false, result: action.payload };
    case gen_result.GENERATE_RESULT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
