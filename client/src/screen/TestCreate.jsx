/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useState, useEffect } from 'react';
import {
  Form,
  Container,
  Button,
  Row,
  Col,
  Modal,
  ListGroup,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';
import { getAllQuestions } from '../actions/questionAction';
import { createTest, getTestDetails } from '../actions/testAction';

import 'react-datepicker/dist/react-datepicker.css';
import SearchBox from '../utils/SearchBox';
import { getAllGroup } from '../actions/groupAction';

const TestCreate = ({ history }) => {
  const [show, setShow] = useState(false);
  const [_id, setID] = useState(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [maxMarks, setMaxMarks] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isSnapshots, setSnapshots] = useState(false);
  const [isAudioRec, setAudioRec] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  let [endTime, setEndTime] = useState(new Date());
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [paperType, setPaperType] = useState(''); //New field Added
  const [groupId, setGroupId] = useState(''); //New field Added
  const [selectedFile, setSelectedFile] = useState('upload pdf');

  const { questions } = useSelector(state => state.questionList);

  const [pdf, setPdf] = useState(null);

  const { testPapers } = useSelector(state => state.getTestPaper);

  const { groups } = useSelector(state => state.groupList);

  const dispatch = useDispatch();

  const { testId } = useParams();
  useEffect(() => {
    if (!questions) {
      dispatch(getAllQuestions());
    }

    if (!groups) dispatch(getAllGroup());

    async function getPaper() {
      const paper = await getTestDetails(testId);
      if (paper) {
        setTitle(paper.title);
        setSubject(paper.subject);
        setDuration(paper.duration);
        setSelectedQuestions(paper.questions);
        setSnapshots(paper.isSnapshots);
        setAudioRec(paper.isAudioRec);
        setPaperType(paper.paperType);
        setCategory(paper.category);
        setID(paper._id);
        setMaxMarks(paper.maxMarks);
      }
    }

    if (testId) getPaper();
  }, []);

  const submitQuestionHandler = (e, w) => {
    let marks = maxMarks;
    let arr = [...selectedQuestions];

    if (e.target.checked) {
      arr.push(e.target.value);
      marks = marks + w;
    } else {
      marks = marks - w;
      arr = arr.filter(a => a !== e.target.value);
    }

    setMaxMarks(marks);
    setSelectedQuestions(arr);
  };

  const modalOpenHandler = () => {
    setShow(true);
    setQuery('');
  };

  const changeHandler = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const ques = !query
    ? questions
    : questions.filter(q =>
        q.subject.toLowerCase().includes(query.toLocaleLowerCase())
      );
  const fileInputHandler = event => {
    setSelectedFile(event.target.files[0].name);
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      setPdf(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = e => {
    e.preventDefault();
    startTime.setMilliseconds(0);
    startTime.setSeconds(0);

    if (paperType !== 'ORGANISATION' && groupId === '') {
      window.alert('Please select group');
    } else {
      dispatch(
        createTest({
          _id,
          title,
          category,
          pdf,
          subject,
          duration,
          selectedQuestions,
          isSnapshots,
          isAudioRec,
          startTime,
          groupId,
          maxMarks,
          paperType,
        })
      );

      if (paperType === 'TUGAS') history.push('/assignment/notConducted');
      else history.push('/tests/notConducted');
    }
  };

  const endTimeHandler = endDate => {
    setEndTime(endDate);
    startTime.setMilliseconds(0);
    startTime.setSeconds(0);
    endDate.setMilliseconds(0);
    endDate.setSeconds(0);
    const d = (endDate - startTime) / 60000;
    setDuration(d);
  };

  return (
    <>
      <Container className="my-5">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="PaperType">
            <Form.Label>PaperType</Form.Label>
            <Form.Control
              as="select"
              value={paperType}
              onChange={e => setPaperType(e.target.value)}
            >
              <option value="">Select Paper-Type</option>
              <option value="ORGANISATION">Organisation</option>
              <option value="GROUP">Group Test</option>
              <option value="TUGAS">Assignment</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="PILIHANGANDA">Multiple Choice</option>
              <option value="PDF">Subject(pdf)</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="group">
            <Form.Label>Group</Form.Label>
            <Form.Control
              as="select"
              disabled={paperType === '' || paperType === 'ORGANISATION'}
              value={groupId}
              onChange={e => setGroupId(e.target.value)}
            >
              <option value="">Select Group</option>
              {groups &&
                groups.map(g => (
                  <option key={g._id} value={g._id}>
                    {g.groupName}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="title">
            <Form.Label>
              <i className="fas fa-pen"></i> Title
            </Form.Label>
            <Form.Control
              required
              placeholder="Title..."
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} md={4} controlId="subject">
              <Form.Label>
                <i className="fas fa-book"></i> Subject
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={2} controlId="duration">
              <Form.Label>
                <i className="fa fa-clock-o"></i> Duration
              </Form.Label>
              <Form.Control
                required
                disabled={paperType === '' || paperType === 'TUGAS'}
                type="number"
                min="0"
                placeholder="Select.."
                value={duration}
                aria-describedby="durationInMinute"
                onChange={e => setDuration(e.target.value)}
              />
              <Form.Text id="durationInMinute" muted>
                Duration must be filled in term of minutes
              </Form.Text>
            </Form.Group>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Form.Group>
              <Form.Label>
                <i className="fa fa-calendar"></i> Start Time
              </Form.Label>
              <br />
              <DatePicker
                selected={startTime}
                onChange={date => setStartTime(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />
            </Form.Group>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {paperType === 'TUGAS' && (
              <Form.Group>
                <Form.Label>
                  <i className="fa fa-calendar"></i> End Time
                </Form.Label>
                <br />
                <DatePicker
                  selected={endTime}
                  onChange={date => endTimeHandler(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                />
              </Form.Group>
            )}
          </Form.Row>
          {category === 'PDF' && (
            <Form.Group controlId="maxmarks">
              <Form.Label>Max Score</Form.Label>
              <Form.Control
                required
                type="number"
                min="0"
                placeholder="Select.."
                value={maxMarks}
                aria-describedby="durationInMinute"
                onChange={e => setMaxMarks(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Enable WebCam"
            checked={isSnapshots}
            disabled={paperType === '' || paperType === 'TUGAS'}
            onChange={() => setSnapshots(!isSnapshots)}
          />

          <Form.Check
            type="switch"
            id="audio-switch"
            label="Enable Audio Recording"
            checked={isAudioRec}
            disabled={paperType === '' || paperType === 'TUGAS'}
            onChange={() => setAudioRec(!isAudioRec)}
          />

          <br />

          {category === 'PILIHANGANDA' ? (
            <Button
              variant="outline-primary"
              className="btn btn-block"
              onClick={() => modalOpenHandler()}
            >
              Select Question
            </Button>
          ) : (
            <Form.File
              id="custom-file"
              label={selectedFile}
              onChange={e => fileInputHandler(e)}
              style={{ width: '50%' }}
              custom
            />
          )}
          <br />
          <br />
          <Button
            variant="outline-primary"
            type="submit"
            disabled={
              selectedQuestions.length || category === 'PDF' ? false : true
            }
          >
            Submit
          </Button>
        </Form>
      </Container>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="my-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <SearchBox changeHandler={changeHandler} />
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {ques &&
              ques.map((question, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={0.6}>
                      <strong>{index + 1}: </strong>
                    </Col>
                    <Col>
                      <Row>
                        <Col xs={2}>
                          <strong>Subject: </strong>
                        </Col>
                        <Col>{question.subject}</Col>
                      </Row>
                      <Row>
                        <Col xs={2}>
                          <strong>Score / Question: </strong>
                        </Col>
                        <Col>{question.weightage}</Col>
                      </Row>
                      <Row>
                        <Col xs={2}>
                          <strong>Question: </strong>
                        </Col>
                        <Col>{question.questionBody}</Col>
                      </Row>
                      <Row>
                        <Col xs={2}>
                          <strong>Options: </strong>
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
                      <Form.Check
                        type="checkbox"
                        value={question._id}
                        checked={
                          selectedQuestions.filter(
                            ques => ques === question._id
                          ).length
                            ? true
                            : false
                        }
                        onChange={e =>
                          submitQuestionHandler(e, question.weightage)
                        }
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TestCreate;
