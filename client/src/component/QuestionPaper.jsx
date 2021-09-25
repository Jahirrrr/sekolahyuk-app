/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from 'react';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import download from 'downloadjs';
import { useSelector } from 'react-redux';
const QuestionPaper = ({ testPaperSheet, pos }) => {
  let { paper } = useSelector(state => state.singleTestPaper);
  const downloadPdf = () => {
    download(paper.pdf, 'Testpaper.pdf', 'application/pdf');
  };
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row
          style={{
            width: '200px',
            margin: 'auto',
          }}
        >
          <h3>Test Paper</h3>
        </Row>
        <Row>
          <Col md={10}>
            <strong>
              <b>SUBJECT</b>
            </strong>{' '}
            : {testPaperSheet[pos].subject}
            <br />
            <br />
            <strong>
              <b>TITLE</b>
            </strong>{' '}
            : {testPaperSheet[pos].title}
          </Col>
          <Col>
            <strong>
              <b>DURATION</b>
            </strong>{' '}
            : {testPaperSheet[pos].duration}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        {testPaperSheet[pos].category === 'PILIHANGANDA' &&
          testPaperSheet[pos].questions.map((question, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col md={0.6}>
                  <strong>{index + 1}: </strong>
                </Col>
                <Col>
                  <Row>
                    <Col md={1}>
                      <strong>Question: </strong>
                    </Col>
                    <Col md={10}>{question.questionBody}</Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={0.6}></Col>

                <Col md={1}>
                  <strong> Options: </strong>
                </Col>
                <Col>
                  {question.options.map((opt, index) => (
                    <React.Fragment key={index}>
                      <strong>{index + 1}: </strong>
                      {opt.optionBody}
                      <br />
                    </React.Fragment>
                  ))}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        {testPaperSheet[pos].category === 'PDF' && (
          <>
            <h3 style={{ color: 'black' }}> Test Paper:</h3>
            <Button
              variant="outline-primary"
              className="btn-block"
              onClick={() => downloadPdf()}
            >
              Download
            </Button>
          </>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default QuestionPaper;
