/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import backgroundLandingpage from './sekolahh.jpg';
import { Col, Container, Row, Card } from 'react-bootstrap';

const HomeScreen = ({ history }) => {
  const { userInfo } = useSelector(state => state.userLogin);
  useEffect(() => {
    if (!userInfo) {
      // history.push("/login");
    }
  }, []);

  return (
    <div className="bgcolor">
      <img src={backgroundLandingpage} style={{ width: '100%', height: '100vh' }} />
      <div
        style={{
          position: 'absolute',
          top: '300px',
          left: '16px',
          color: 'white',
          fontSize: '4vw',
        }}
      >
        SekolahYuk :
        <br />
        Aplikasi Pembelajaran Gratis Untuk Sekolah
        <br />
        Build With M.E.R.N Stack
        <br />
      <div className="buttons">
		        <a href={"https://github.com/ZSofttt/sekolahyuk-app"} className="btn btn-primary">Source Code</a>
		      </div>
      </div>
      <Container className="my-3 ">
        <Row>
          <Col>
            <h2 style={{ color: 'black' }}>Fitur Aplikasi</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded text-center">
              <Card.Header variant="dark" style={{ color: 'black' }}>
                <Card.Title as="div">
                  <i className="fas fa-microphone fa-3x"></i>
                  <br />
                  <strong>Rekam Audio</strong>
                </Card.Title>
              </Card.Header>
              <Card.Body>Dapat merekam audio saat pembelajaran atau test berlangsung</Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded text-center">
              <Card.Header variant="dark" style={{ color: 'black' }}>
                <Card.Title as="div">
                  <i className="fas fa-camera fa-3x"></i>
                  <br />
                  <strong>Rekam Gambar</strong>
                </Card.Title>
              </Card.Header>
              <Card.Body>Dapat merekam gambar saat pembelajaran atau test berlangsung</Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded text-center">
              <Card.Header variant="dark" style={{ color: 'black' }}>
                <Card.Title as="div">
                  <i className="fas fa-file-download fa-3x"></i>
                  <br />
                  <strong>Download Hasil Nilai</strong>
                </Card.Title>
              </Card.Header>
              <Card.Body>Download hasil nilai dalam format excel</Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded text-center">
              <Card.Header variant="dark" style={{ color: 'black' }}>
                <Card.Title as="div">
                  <i className="fas fa-file-pdf fa-3x"></i>
                  <br />
                  <strong>Support PDF</strong>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                Untuk memberikan materi pembelajaran didalam format PDF
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded text-center">
              <Card.Header variant="dark" style={{ color: 'black' }}>
                <Card.Title as="div">
                  <i className="fas fa-file fa-3x"></i>
                  <br />
                  <strong>Kasih Tugas</strong>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                Guru bisa memberikan Tugas Sepuasnya kepada Muridnya
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded text-center">
              <Card.Header variant="dark" style={{ color: 'black' }}>
                <Card.Title as="div">
                  <i className="fas fa-users fa-3x"></i>
                  <br />
                  <strong>Buat Grup</strong>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                Guru bisa membuat grup, dan murid bisa masuk ke grup tersebut
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded text-center">
              <Card.Header variant="dark" style={{ color: 'black' }}>
                <Card.Title as="div">
                  <i className="fas fa-check-square fa-3x"></i>
                  <br />
                  <strong>Hasil Nilai Otomatis</strong>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                Setelah murid selesai mengerjakan test, nilai akan keluar otomatis{' '}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
