/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */




import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { getConductedTestPaper } from '../actions/testAction';
import TestTable from '../component/TestTable';
import Loader from '../utils/Loader';

const TestConductedList = () => {
  const { loading, conductedTestPapers } = useSelector(
    state => state.getTestPaper
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!conductedTestPapers) {
      dispatch(getConductedTestPaper());
    }
  }, []);
  return (
    <>
      {loading && <Loader />}
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3 style={{ color: 'black' }}>All Tests</h3>
          </Col>
          <Col className="text-right">
            <Button
              onClick={() => dispatch(getConductedTestPaper())}
              className="my-3"
              variant="outline-primary"
            >
              <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
            </Button>
          </Col>
        </Row>
        <TestTable testPapers={conductedTestPapers} isShow={false} />
      </Container>
    </>
  );
};

export default TestConductedList;
