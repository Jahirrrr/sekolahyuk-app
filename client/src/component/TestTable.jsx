/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Table, Button, Container, Modal, Tab, Tabs } from 'react-bootstrap';
import QuestionPaper from '../component/QuestionPaper';
import QuestionDetails from '../component/QuestionDetails';
import {
  testBegin,
  testEndByTeacher,
  testPaperDelete,
} from '../actions/testAction';
import { openRegistrationforTest } from '../actions/studentRegistrationAction';
import { paginate } from '../utils/paginate';
import { pageLength } from '../constants/pageConstant';
import Paginations from '../utils/Pagination';
import Statistics from '../component/Statistics';
import Trainees from '../component/Trainees';
import Timer from '../utils/Timer';
import RankList from './RankList';

const TestTable = ({
  testPapers,
  isShow,
  deleteEdit,
  isAssignment = false,
}) => {
  const [show, setShow] = useState(false);
  const [pos, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageLength);

  const count = testPapers ? testPapers.length : 0;

  const dispatch = useDispatch();

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  let testPaperSheet = paginate(testPapers, currentPage, pageSize);

  const [totalCount, setTotalCount] = useState(count);

  const set = index => {
    setShow(true);
    setIndex(index);
  };

  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(testPaperDelete(testPapers, id, isShow));
      setTotalCount(totalCount => totalCount - 1);
      let currPage = Math.floor((totalCount - 1) / pageSize);
      setCurrentPage(currPage);
      testPaperSheet = paginate(testPapers, currentPage, pageSize);
    }
  };

  const handleClick = (id, status) => {
    status = status ? false : true;
    dispatch(openRegistrationforTest({ testPapers, id, status }));
  };

  const endTest = (id, category = null) => {
    dispatch(testEndByTeacher(testPaperSheet, id));

    if (category === 'TUGAS') history.push(`/assignment/conducted`);
    else history.push(`/tests/conducted`);
  };

  const history = useHistory();
  const editTestPaper = index => {
    history.push(`/tests/edit/${testPaperSheet[index]._id}`);
  };

  return (
    <>
      <Container>
        <Table hover bordered striped responsive className="table-centered">
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>TITLE</th>
              <th>DURATION(IN MIN)</th>
              <th>CREATED AT</th>
              {isShow && (
                <>
                  {!isAssignment && (
                    <>
                      <th>REGISTRATION</th>
                    </>
                  )}
                  <th>START TEST</th>
                  <th>TIME LEFT</th>
                  {deleteEdit && <th>Edit Test</th>}
                </>
              )}
              <th>&nbsp;&nbsp;DETAILS&nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {testPaperSheet &&
              testPaperSheet.map((test, index) => (
                <tr key={test._id} style={{ textAlign: 'center' }}>
                  <td>{test.subject}</td>
                  <td>{test.title}</td>
                  <td>{test.duration}</td>
                  <td>{test.createdAt.substring(0, 10)}</td>
                  {!test.isTestConducted && (
                    <>
                      {!isAssignment && (
                        <>
                          <td>
                            {test.paperType === 'GROUP' ||
                            test.paperType === 'TUGAS' ? (
                              'Not Required'
                            ) : (
                              <Button
                                variant="outline-primary"
                                className="btn btn-block"
                                disabled={
                                  test.isTestBegins ||
                                  test.paperType === 'GROUP'
                                }
                                onClick={() =>
                                  handleClick(
                                    test._id,
                                    test.isRegistrationAvailable
                                  )
                                }
                              >
                                {test.isRegistrationAvailable
                                  ? 'Close'
                                  : 'Open'}
                              </Button>
                            )}
                          </td>
                        </>
                      )}
                      <td>
                        <Button
                          variant="outline-primary"
                          className="btn btn-block"
                          disabled={test.isTestBegins}
                          onClick={() =>
                            dispatch(
                              testBegin(
                                test._id,
                                pageSize * (currentPage - 1) + index,
                                testPapers
                              )
                            )
                          }
                        >
                          Start Test
                        </Button>
                      </td>

                      <td>
                        {test.isTestBegins
                          ? !test.isTestConducted && (
                              <Timer
                                time={test.startTime}
                                duration={test.duration}
                                endTest={endTest}
                                testId={test._id}
                                paperType={test.paperType}
                              />
                            )
                          : 'Not Started'}
                      </td>
                      {deleteEdit && (
                        <td>
                          <Button
                            variant="outline-primary"
                            className="btn-sm"
                            disabled={test.isTestBegins}
                            onClick={() => editTestPaper(index)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </td>
                      )}
                    </>
                  )}

                  <td>
                    <Button
                      variant="outline-primary"
                      className="btn-sm"
                      onClick={() => set(index)}
                    >
                      <i className="fas fa-info-circle"></i>
                    </Button>
                    &nbsp;&nbsp;
                    {deleteEdit && (
                      <Button
                        variant="outline-primary"
                        className="btn-sm"
                        onClick={() => deleteHandler(test._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
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
      </Container>
      {testPaperSheet && testPaperSheet[pos] && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="my-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Body>
            <Tabs defaultActiveKey="details">
              <Tab
                eventKey="details"
                title={<i className="fas fa-info-circle"> Details</i>}
              >
                <QuestionDetails testPaperSheet={testPaperSheet} pos={pos} />
              </Tab>
              <Tab
                eventKey="questions"
                title={<i className="fas fa-question-circle"> Question</i>}
              >
                <QuestionPaper testPaperSheet={testPaperSheet} pos={pos} />
              </Tab>
              <Tab
                eventKey="trainee"
                title={<i className="fas fa-user"> Students</i>}
              >
                <Trainees id={testPaperSheet[pos]._id} />
              </Tab>
              <Tab
                eventKey="statistics"
                disabled={!testPaperSheet[pos].isTestConducted}
                title={<i className="fas fa-chart-bar"> Statistics</i>}
              >
                <Statistics id={testPaperSheet[pos]._id} />
              </Tab>
              <Tab
                eventKey="rankList"
                disabled={!testPaperSheet[pos].isTestConducted}
                title={<i className="fa fa-trophy"> RankList</i>}
              >
                <RankList testId={testPaperSheet[pos]._id} />
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default TestTable;
