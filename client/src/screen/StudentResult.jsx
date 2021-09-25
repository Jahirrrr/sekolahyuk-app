/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Container, Col, Table, ListGroup, Button } from 'react-bootstrap';
import { resultGenerate } from '../actions/generateResultAction';
import { getStudentDetail } from '../actions/studentRegistrationAction';
import { getSinglePaper } from '../actions/testAction';
import Loader from '../utils/Loader';
import SingleQuestion from '../component/SingleQuestion';
import download from 'downloadjs';
import { getResponsePdf } from '../actions/responseSheetAction';

const StudentResult = () => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get('testId');
  const studentId = query.get('studentId');

  const [show, setShow] = useState(false);
  const [pos, setIndex] = useState(0);

  const { loading, result, error } = useSelector(state => state.generateResult);
  const { student } = useSelector(state => state.studentDetail);

  const { paper } = useSelector(state => state.singleTestPaper);
  const questions = paper && paper.questions;

  const dispatch = useDispatch();
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('navigationhandler'));
    if (!paper || testId !== paper._id) dispatch(getSinglePaper(testId));
    if (!student || studentId !== student._id)
      dispatch(getStudentDetail(studentId));
    if (!result || studentId !== result.studentId || paper._id !== testId)
      dispatch(resultGenerate({ testId, studentId }));
  }, []);

  const set = index => {
    setShow(true);
    setIndex(index);
  };
  const downloadQuestionPaper = () => {
    //console.log(paper.pdf);
    download(paper.pdf, 'Testpaper.pdf', 'application/pdf');
  };
  const downloadResponseSheet = async () => {
    const pdf = await getResponsePdf(student._id, paper._id);
    download(pdf, `responsesheet.pdf`, 'application/pdf');
  };
  return (
    <Container>
      {loading && <Loader />}
      <Row>
        <Col className="align-items-left">
          <h3 style={{ color: 'black' }}>STUDENT RESULT</h3>
        </Col>
      </Row>
      {student && (
        <Table responsive className="my-2">
          <tbody>
            <tr>
              <td>
                <strong>NAME </strong>
              </td>
              <td>{student.name.toUpperCase()}</td>
            </tr>
            <tr>
              <td>
                <strong>EMAIL </strong>
              </td>
              <td>{student.email}</td>
            </tr>

            <tr>
              <td>
                <strong>MARKS(out of {paper && paper.maxMarks})</strong>
              </td>
              <td>
                {result === 'Not Attempt' && 'Not Attempt'}
                {result && result.score === -1 && 'Not Checked'}
                {result && result.score !== -1 && result.score}
              </td>
            </tr>
          </tbody>
        </Table>
      )}
      {result === 'Not Attempt' && (
        <div className="reasendmail-container-register">
          Student has not given the test
        </div>
      )}
      {result !== 'Not Attempt' && paper && paper.category === 'PDF' && (
        <>
          <ListGroup.Item style={{ margin: '20px' }}>
            <h3 style={{ color: 'black' }}> Test Paper:</h3>
            <Button
              variant="outline-primary"
              className="btn-block"
              onClick={() => downloadQuestionPaper()}
            >
              Download
            </Button>
          </ListGroup.Item>
          <ListGroup.Item style={{ margin: '20px' }}>
            <h3 style={{ color: 'black' }}> Response Sheet:</h3>
            <Button
              variant="outline-primary"
              className="btn-block"
              onClick={() => downloadResponseSheet()}
            >
              Download
            </Button>
          </ListGroup.Item>
        </>
      )}

      {result !== 'Not Attempt' && paper && paper.category !== 'PDF' && (
        <Table
          hover
          bordered
          striped
          responsive
          style={{ textAlign: 'center' }}
        >
          <thead>
            <tr>
              <th>SNo.</th>
              <th>View Question</th>
              <th>Correct Answer</th>
              <th>Given Answer</th>
              <th>Weightage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {result &&
              result.subResult.map((res, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="Btn btn-block"
                      onClick={() => set(index)}
                    >
                      Details
                    </Button>
                  </td>
                  <td>{res.correctAnswer.map(correct => correct)}</td>
                  <td>
                    {res.response.length
                      ? res.response.map(r => r)
                      : 'Not Attempt'}
                  </td>
                  <td>{res.weightage}</td>
                  <td>
                    {res.isCorrect ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fa fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

      {questions && questions.length > 0 && (
        <SingleQuestion
          question={questions[pos]}
          show={show}
          setShow={setShow}
        />
      )}
    </Container>
  );
};

export default StudentResult;
