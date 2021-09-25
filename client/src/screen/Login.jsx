/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { login } from '../actions/userAction';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userInfo } = useSelector(state => state.userLogin);
  const location = useLocation();
  const redirect = location.search ? location.search.slice(10, 89) : '/';
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col sx={12} md={6}>
          <h2>Masuk</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Alamat Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan Alamat Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Kata Sandi</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan Sandi"
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Masuk
            </Button>

            <Row className="py-3 px-3">
              Belum Punya Akun ? &nbsp;&nbsp; <Link to="/register">Buat Akun</Link>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
