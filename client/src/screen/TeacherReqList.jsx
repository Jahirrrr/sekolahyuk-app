/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { teacherReqList } from '../actions/teacherAction';
import Loader from '../utils/Loader';
import TeacherTable from '../component/TeacherTable';

const TeacherReqList = () => {
  const { loading, teacher } = useSelector(
    state => state.teacherReqList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!teacher) {
      dispatch(teacherReqList());
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {teacher && (
        <TeacherTable teacher={teacher} permission={false} />
      )}
    </>
  );
};

export default TeacherReqList;
