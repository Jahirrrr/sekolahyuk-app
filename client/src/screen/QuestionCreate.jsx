/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { addQuestion } from '../actions/questionAction';

const QuestionCreate = ({ history }) => {
  const [questionBody, setQuestion] = useState('');
  const [explaination, setExplaination] = useState('');
  const [subject, setSubject] = useState('');
  const [weightage, setWeightage] = useState(1);
  const [opt1, setOpt1] = useState({ optionBody: '', isAnswer: false });
  const [opt2, setOpt2] = useState({ optionBody: '', isAnswer: false });
  const [opt3, setOpt3] = useState({ optionBody: '', isAnswer: false });
  const [opt4, setOpt4] = useState({ optionBody: '', isAnswer: false });

  const dispatch = useDispatch();

  const { questions } = useSelector(state => state.questionList);

  const submitHandler = e => {
    e.preventDefault();
    const options = [opt1, opt2, opt3, opt4];
    dispatch(
      addQuestion(questions, {
        questionBody,
        explaination,
        subject,
        weightage,
        options,
      })
    );
    history.push('/questions');
  };

  return (
    <Container className="my-5">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            required
            placeholder="Question Description..."
            type="text"
            value={questionBody}
            onChange={e => setQuestion(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="explaination">
          <Form.Label>Explaination</Form.Label>
          <Form.Control
            placeholder="Explaination...."
            as="textarea"
            row={3}
            value={explaination}
            onChange={e => setExplaination(e.target.value)}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="weightage">
            <Form.Label>Score / Question</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Select.."
              value={weightage}
              onChange={e => setWeightage(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="option1">
            <Form.Label>Option A</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="option..."
              value={opt1.optionBody}
              onChange={e => setOpt1({ ...opt1, optionBody: e.target.value })}
            />
            <Form.Check
              type="checkbox"
              checked={opt1.isAnswer}
              onChange={e => setOpt1({ ...opt1, isAnswer: e.target.checked })}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="option2">
            <Form.Label>Option B</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="option..."
              value={opt2.optionBody}
              onChange={e => setOpt2({ ...opt2, optionBody: e.target.value })}
            />
            <Form.Check
              type="checkbox"
              checked={opt2.isAnswer}
              onChange={e => setOpt2({ ...opt2, isAnswer: e.target.checked })}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="option3">
            <Form.Label>Option C</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="option..."
              value={opt3.optionBody}
              onChange={e => setOpt3({ ...opt3, optionBody: e.target.value })}
            />
            <Form.Check
              type="checkbox"
              checked={opt3.isAnswer}
              onChange={e => setOpt3({ ...opt3, isAnswer: e.target.checked })}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="option4">
            <Form.Label>Option D</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="option..."
              value={opt4.optionBody}
              onChange={e => setOpt4({ ...opt4, optionBody: e.target.value })}
            />
            <Form.Check
              type="checkbox"
              checked={opt4.isAnswer}
              onChange={e => setOpt4({ ...opt4, isAnswer: e.target.checked })}
            />
          </Form.Group>
        </Form.Row>

        <Button
          variant="outline-primary"
          type="submit"
          disabled={
            !opt1.isAnswer && !opt2.isAnswer && !opt3.isAnswer && !opt4.isAnswer
          }
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default QuestionCreate;
