/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Container } from 'react-bootstrap';

import Loader from '../utils/Loader';
import TestTable from '../component/TestTable';
import { getNotConductedAssignment } from './../actions/testAction';

const AssignmentNotConductedList = () => {
  const { loading, notConductedAssignment } = useSelector(
    state => state.getTestPaper
  );

  const { userInfo } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (!notConductedAssignment) {
      dispatch(getNotConductedAssignment());
    }
  }, []);

  //PAGINATION
  const createHandler = () => {
    history.push('/tests/create');
  };

  return (
    <>
      {loading && <Loader />}
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3 style={{ color: 'black' }}>All Assignments</h3>
          </Col>
          <Col className="text-right py-2">
            <Button className="my-3" onClick={createHandler}>
              <i className="fas fa-plus"></i>&nbsp;&nbsp;Create New Assignment
            </Button>
          </Col>
        </Row>
        <TestTable
          testPapers={notConductedAssignment}
          isShow={true}
          deleteEdit={true}
          isAssignment={true}
        />
      </Container>
    </>
  );
};

export default AssignmentNotConductedList;
