/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import Loader from '../utils/Loader';
import { getAllRegisteredStudent } from '../actions/studentRegistrationAction';
import { getSinglePaper } from '../actions/testAction';
import download from 'downloadjs';
import { getResponsePdf } from './../actions/responseSheetAction';
import { editResultScore, getScore } from './../actions/generateResultAction';
import { toast } from 'react-toastify';

const Trainees = ({ id }) => {
  const [show, setShow] = useState(false);
  const [pos, setIndex] = useState(0);
  const [marks, setMarks] = useState(0);
  const dispatch = useDispatch();

  const { loading, registeredStudent: students } = useSelector(
    state => state.registeredStudentList
  );
  let { paper } = useSelector(state => state.singleTestPaper);
  let { notConductedTestPapers, notConductedAssignment } = useSelector(
    state => state.getTestPaper
  );

  const [scores, setScores] = useState([]);

  let conductedPaper = null;
  if (notConductedTestPapers)
    conductedPaper = notConductedTestPapers && notConductedTestPapers;
  else conductedPaper = notConductedAssignment;

  useEffect(() => {
    dispatch(getAllRegisteredStudent(id));
    dispatch(getSinglePaper(id));

    getAllScore();
  }, []);
  const getAllScore = async () => {
    const score = await getScore(id);
    setScores(score);
  };

  const resultWindowHandler = studentId => {
    window.open(`/student/test/result?testId=${id}&studentId=${studentId}`);
  };
  const snapshotHandler = studentId => {
    window.open(`/student/test/snapshots?testId=${id}&studentId=${studentId}`);
  };
  const audioHandler = studentId => {
    window.open(`/student/test/audio?testId=${id}&studentId=${studentId}`);
  };

  const downloadPdf = async (studentId, studentName) => {
    const pdf = await getResponsePdf(studentId, id);
    if (pdf === 'Not Attempt' || pdf.length === 0) {
      toast.error('Student has not attempt this test');
    } else {
      download(pdf, `${studentName}_responsesheet.pdf`, 'application/pdf');
    }
  };

  const editScore = async studentId => {
    //console.log(studentId);
    await editResultScore(id, studentId, marks);
    getAllScore();
    setShow(false);
  };
  const set = index => {
    setShow(true);
    setIndex(index);
  };

  return (
    <>
      {loading && <Loader />}
      <Button
        className="my-3"
        onClick={() => dispatch(getAllRegisteredStudent(id))}
      >
        <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
      </Button>
      <Table
        hover
        bordered
        striped
        responsive
        style={{ textAlign: 'center', marginTop: '10px' }}
      >
        <thead>
          <tr>
            <th>SNo.</th>
            <th>STUDENT NAME</th>
            <th>EMAIL ID</th>
            {paper && paper.category === 'PDF' && (
              <>
                <th>Obtained Score</th>
                <th>Edit/Give Score</th>
                <th>Response Sheet</th>
              </>
            )}
            {paper && paper.category === 'PILIHANGANDA' && <th>PERFORMANCE</th>}

            <th>SNAPSHOT</th>
            <th>Audio Recording</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((stud, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{stud.name}</td>
                <td>{stud.email}</td>
                {paper && paper.category === 'PDF' && (
                  <>
                    <td>
                      {scores.length === 0
                        ? `Not Checked`
                        : scores.map(result => {
                            if (result.studentId === stud._id) {
                              if (result.score === -1) {
                                return `Not Checked`;
                              } else {
                                return `${result.score}`;
                              }
                            }
                          })}
                    </td>
                    <td>
                      <Button
                        disabled={
                          conductedPaper &&
                          conductedPaper.map(
                            p => p.id === id && !paper.isTestConducted
                          )
                        }
                        variant="outline-danger"
                        onClick={() => set(index)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        disabled={
                          conductedPaper &&
                          conductedPaper.map(
                            p => p.id === id && !paper.isTestConducted
                          )
                        }
                        variant="outline-danger"
                        onClick={() => downloadPdf(stud._id, stud.name)}
                      >
                        Download
                      </Button>
                    </td>
                  </>
                )}
                {paper && paper.category === 'PILIHANGANDA' && (
                  <td>
                    <Button
                      variant="outline-danger"
                      disabled={
                        conductedPaper &&
                        conductedPaper.filter(
                          p => p._id === id && !p.isTestConducted
                        ).length
                          ? true
                          : false
                      }
                      onClick={() => resultWindowHandler(stud._id)}
                    >
                      Result
                    </Button>
                  </td>
                )}

                <td>
                  <Button
                    variant="outline-danger"
                    disabled={
                      conductedPaper &&
                      conductedPaper.map(
                        p => p._id === id && !p.isTestConducted
                      )
                    }
                    onClick={() => snapshotHandler(stud._id)}
                  >
                    SnapShot
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    disabled={
                      conductedPaper &&
                      conductedPaper.map(
                        p => p._id === id && !p.isTestConducted
                      )
                    }
                    onClick={() => audioHandler(stud._id)}
                  >
                    Audio
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {students && students[pos] && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="my-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Body>
            <Form>
              <Form.Group controlId="question">
                <Form.Label>Score</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter Score"
                  type="text"
                  value={marks}
                  onChange={e => setMarks(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="outline-primary"
                onClick={() => editScore(students[pos]._id)}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Trainees;
