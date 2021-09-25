/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userRegister } from '../actions/userAction';
import { toast } from 'react-toastify';

const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password Does not match');
    } else {
      userRegister({ name, email, password, category }, history);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col sx={12} md={6}>
          <h2>Buat Akun</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Masukkan nama"
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Alamat Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Masukkan Alamat Email"
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">Pilih Kategori</option>
                <option value="TEACHER">Guru</option>
                <option value="STUDENT">Murid</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Kata Sandi</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Masukkan Kata Sandi"
                onChange={e => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Konfirmasi Sandi</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                placeholder="Konfirmasi Sandi"
                onChange={e => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Kirim
            </Button>

            <Row className="py-3 px-3">
              Sudah Punya Akun ? &nbsp;&nbsp;{' '}
              <Link to="/login">Masuk</Link>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
