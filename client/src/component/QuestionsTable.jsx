/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Button, Modal, ListGroup } from 'react-bootstrap';
import { deleteQuestion } from '../actions/questionAction';
import { pageLength } from '../constants/pageConstant';
import { paginate } from '../utils/paginate';
import Paginations from '../utils/Pagination';

const QuestionsTable = ({ questions }) => {
  const [show, setShow] = useState(false);
  const [pos, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageLength);

  const count = questions && questions.length;
  let ques = paginate(questions, currentPage, pageSize);

  const [totalCount, setTotalCount] = useState(count);
  const dispatch = useDispatch();

  const deleteHandler = id => {
    if (window.confirm('Are you sure ')) {
      dispatch(deleteQuestion(questions, id));
      setTotalCount(totalCount => totalCount - 1);
      let currPage = Math.floor((totalCount - 1) / pageSize);
      setCurrentPage(currPage);
      ques = paginate(ques, currentPage, pageSize);
    }
  };

  const set = index => {
    setShow(true);
    setIndex(index);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table
        hover
        bordered
        striped
        responsive
        className="table-lg table-centered"
      >
        <thead>
          <tr>
            <th>SUBJECT</th>
            <th>QUESTION</th>
            <th>SCORE / QUESTION</th>
            <th>&nbsp;&nbsp;DETAILS&nbsp;&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ques &&
            ques.map((question, index) => (
              <tr key={question._id}>
                <td>{question.subject}</td>
                <td>{question.questionBody}</td>
                <td>{question.weightage}</td>
                <td>
                  <Button
                    variant="primary"
                    className="btn-sm"
                    onClick={() => set(index)}
                  >
                    <i className="fas fa-info-circle"></i>
                  </Button>
                  &nbsp;
                  <Button
                    variant="primary"
                    className="btn-sm"
                    onClick={() => deleteHandler(question._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Paginations
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {ques && ques[pos] && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="my-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton style={{ textAlign: 'center' }}>
            <Modal.Title id="example-custom-modal-styling-title">
              Question
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>
                  <b>SUBJECT</b>
                </strong>{' '}
                : {ques[pos].subject}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>WEIGHTAGE</b>
                </strong>{' '}
                : {ques[pos].weightage}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>QUESTION</b>
                </strong>{' '}
                : {ques[pos].questionBody}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>OPTIONS</b>
                </strong>
                <br></br>
                {ques[pos].options.map((opt, index) => (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong>{index + 1}</strong>: {opt.optionBody}
                    <br></br>
                  </>
                ))}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>Answer:</b>{' '}
                </strong>
                {ques[pos].options.map((opt, index) => (
                  <>
                    {opt.isAnswer && (
                      <>
                        <strong key={index}>Option{index + 1}</strong>:{' '}
                        {opt.optionBody}
                        ,&nbsp;
                      </>
                    )}
                  </>
                ))}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>EXPLAINATION</b>
                </strong>{' '}
                : {ques[pos].explaination}
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default QuestionsTable;
