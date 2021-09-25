/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import http from '../utils/httpService';
import { toast } from 'react-toastify';
import { QUESTION_LIST_RESET } from '../constants/questionConstant';
import { TEST_LIST_RESET } from '../constants/testConstant';
import { STUDENT_TEST_LIST_RESET } from '../constants/studentRegistrationConstant';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstanst';
import { GROUP_RESET } from '../constants/groupConstant';
import errorHandler from '../errorHandler';

export const userRegister = async (newUser, history) => {
  try {
    await http.post('/api/signup', newUser);

    toast.success('Successfully Register');
    history.push('/login');
  } catch (ex) {
    errorHandler(ex);
  }
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await http.post('/api/login', { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    toast.success('Successfully login');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (ex) {
    errorHandler(ex);
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: QUESTION_LIST_RESET });
  dispatch({ type: TEST_LIST_RESET });
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: GROUP_RESET });
  dispatch({ type: STUDENT_TEST_LIST_RESET });
  dispatch({ type: 'SET_URL_RESET' });
};
