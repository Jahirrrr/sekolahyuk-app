/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as group from '../constants/groupConstant';

export const groupListReducer = (state = {}, action) => {
  switch (action.type) {
    case group.GROUP_LIST_REQUEST:
      return { loading: true };
    case group.GROUP_LIST_SUCCESS:
      return { loading: false, groups: action.payload };
    case group.GROUP_LIST_FAIL:
      return { loading: false, error: action.payload };
    case group.GROUP_RESET:
      return {};
    default:
      return state;
  }
};
