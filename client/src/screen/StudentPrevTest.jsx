/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { studentTestPaperList } from '../actions/studentRegistrationAction';
import StudentTestTable from '../component/StudentGroupTestTable';
import Loader from '../utils/Loader';

const StudentPrevTest = () => {
  const { loading, givenPaper } = useSelector(state => state.studentTestList);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!givenPaper) dispatch(studentTestPaperList());
  }, []);

  return (
    <Container>
      {loading && <Loader />}
      <Row className="align-items-center">
        <Col>
          <h3 style={{ color: 'black' }}>Previous Test</h3>
        </Col>
        <Col className="text-right">
          <Button
            variant="outline-primary"
            className="my-3"
            onClick={() => dispatch(studentTestPaperList())}
          >
            <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
          </Button>
        </Col>
      </Row>
      <StudentTestTable isShow={false} all={true} testPapers={givenPaper} />
    </Container>
  );
};

export default StudentPrevTest;
