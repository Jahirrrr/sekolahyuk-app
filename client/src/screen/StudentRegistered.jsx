/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { studentRegistrationForTest } from '../actions/studentRegistrationAction';

const StudentRegistered = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { id: testId } = useParams();

  var mainlink = window.location.href.split('/').splice(0, 3);
  var link = '';
  mainlink.forEach(d => {
    link = link + d + '/';
  });

  const submitHandler = async e => {
    e.preventDefault();

    await studentRegistrationForTest(
      { email, password, testId, link },
      history
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col sx={12} md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>
                <i className="fas fa-envelope"></i> Email Address
              </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>
                <i className="fa fa-key"></i> Password
              </Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="outline-primary">
              Register
            </Button>

            <Row className="py-3 px-3">
              NEW USER ? &nbsp;&nbsp; <Link to="/register">REGISTER</Link>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentRegistered;
