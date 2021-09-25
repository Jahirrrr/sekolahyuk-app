/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Container } from "react-bootstrap";
import TestTable from "../component/TestTable";
import Loader from "../utils/Loader";
import { getConductedAssignment } from "./../actions/testAction";

const AssignmentConductedList = () => {
  const { loading, conductedAssignment } = useSelector(
    (state) => state.getTestPaper
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!conductedAssignment) {
      dispatch(getConductedAssignment());
    }
  }, []);
  return (
    <>
      {loading && <Loader />}
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3 style={{ color: "black" }}>All Assignments</h3>
          </Col>
          <Col className="text-right">
            <Button
              onClick={() => dispatch(getConductedAssignment())}
              className="my-3"
              variant="outline-primary"
            >
              <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
            </Button>
          </Col>
        </Row>
        <TestTable testPapers={conductedAssignment} isShow={false} />
      </Container>
    </>
  );
};

export default AssignmentConductedList;
