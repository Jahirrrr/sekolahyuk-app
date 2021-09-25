/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const QuestionDetails = ({ testPaperSheet, pos }) => {
  var link = window.location.href.split("/").splice(0, 3);
  var mainlink = "";
  link.forEach((d) => {
    mainlink = mainlink + d + "/";
  });

  return (
    <ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>TEST CATEGORY </strong>
          </Col>
          <Col>{testPaperSheet[pos].paperType}</Col>
        </Row>
      </ListGroup.Item>
      {testPaperSheet[pos].paperType === "ORGANISATION" && (
        <ListGroup.Item>
          <Row>
            <Col md={5}>
              <strong>
                TEST Link &nbsp;{" "}
                <CopyToClipboard
                  text={`${mainlink}student/registration/test/${testPaperSheet[pos]._id}`}
                  onCopy={() => toast.info("Link Copied to clipboard")}
                >
                  <i className="fas fa-copy"></i>
                </CopyToClipboard>
              </strong>
            </Col>

            <Col md={5}>
              <a>{`${mainlink}student/registration/test/${testPaperSheet[pos]._id}`}</a>
            </Col>
          </Row>
        </ListGroup.Item>
      )}
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>TEST NAME </strong>
          </Col>
          <Col>{testPaperSheet[pos].title}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>SUBJECT </strong>
          </Col>
          <Col>{testPaperSheet[pos].subject}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>DURATION </strong>
          </Col>
          <Col>{testPaperSheet[pos].duration}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>MAX SCORE</strong>
          </Col>
          <Col>{testPaperSheet[pos].maxMarks}</Col>
        </Row>
      </ListGroup.Item>
    </ListGroup.Item>
  );
};

export default QuestionDetails;
