/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import * as question from '../constants/questionConstant';
import http from '../utils/httpService';
import { toast } from 'react-toastify';
import { getNotConductedTestPaper } from './testAction';
import Token from '../utils/Token';
import errorHandler from '../errorHandler';

export const addQuestion = (questions, newQuestion) => async dispatch => {
  try {
    const { data } = await http.post(
      '/api/questions/create',
      newQuestion,
      Token()
    );

    const arr = [...questions];
    arr.push(data);
    dispatch({
      type: question.QUESTION_LIST_SUCCESS,
      payload: arr,
    });
    //dispatch(getAllQuestions());
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getAllQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: question.QUESTION_LIST_REQUEST });

    const { data } = await http.get('/api/questions/details/all', Token());

    dispatch({
      type: question.QUESTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const deleteQuestion = (questions, id) => async (dispatch, getState) => {
  try {
    const { data } = await http.delete(`/api/questions/delete/${id}`, Token());
    const arr = questions.filter(ques => ques._id !== id);

    dispatch({ type: question.QUESTION_LIST_SUCCESS, payload: arr });
    dispatch(getNotConductedTestPaper());

    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};
