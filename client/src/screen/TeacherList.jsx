/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { teacherList } from '../actions/teacherAction';
import Loader from '../utils/Loader';
import TeacherTable from '../component/TeacherTable';

const TeacherList = () => {
  const { loading, teacher } = useSelector(state => state.teacherList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!teacher) {
      dispatch(teacherList());
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {teacher && (
        <TeacherTable teacher={teacher} permission={true} />
      )}
    </>
  );
};

export default TeacherList;
