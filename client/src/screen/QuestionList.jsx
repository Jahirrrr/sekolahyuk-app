/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */




import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Container, Row } from 'react-bootstrap';
import { getAllQuestions } from '../actions/questionAction';
import Loader from '../utils/Loader';
import SearchBox from '../utils/SearchBox';
import QuestionsTable from '../component/QuestionsTable';

const QuestionList = ({ history }) => {
  const { loading, questions } = useSelector(state => state.questionList);
  const { userInfo } = useSelector(state => state.userLogin);
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (!questions) {
      dispatch(getAllQuestions());
    }
  }, []);

  const createHandler = () => {
    history.push('/questions/create');
  };

  const changeHandler = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const results = !query
    ? questions
    : questions.filter(q =>
        q.subject.toLowerCase().includes(query.toLocaleLowerCase())
      );

  return (
    <>
      {loading && <Loader />}
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3 style={{ color: 'black' }}>All Questions</h3>
          </Col>
          <Col className="text-right">
            <Button className="my-3" onClick={createHandler}>
              <i className="fas fa-plus"></i>&nbsp;&nbsp;Add New Question
            </Button>
          </Col>
        </Row>

        <SearchBox changeHandler={changeHandler} />
        <QuestionsTable questions={results} />
      </Container>
    </>
  );
};

export default QuestionList;
