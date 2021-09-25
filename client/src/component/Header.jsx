/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userAction';

const Header = () => {
  const dispatch = useDispatch();
  const { path } = useSelector(state => state.urlPath);

  const { userInfo } = useSelector(state => state.userLogin);

  const logOutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      {path !== '/student/test/start' && (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>ZSoft - SekolahYuk</Navbar.Brand>
            </LinkContainer>
            {userInfo && (
              <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    {userInfo && userInfo.category === 'TEACHER' && (
                      <>
                        <LinkContainer to="/questions">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;Semua Pertanyaan
                          </Nav.Link>
                        </LinkContainer>

                        <NavDropdown title="Semua Test" id="test">
                          <LinkContainer to="/tests/notConducted">
                            <NavDropdown.Item>
                              <i className="fas fa-paper-plane"></i>
                              &nbsp;Test Yang Belum Selesai
                            </NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to="/tests/conducted">
                            <NavDropdown.Item>
                              <i className="fas fa-paper-plane"></i>
                              &nbsp;Test Yang Sudah Selesai
                            </NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                        <NavDropdown title="Semua Tugas" id="assignment">
                          <LinkContainer to="/assignment/notConducted">
                            <NavDropdown.Item>
                              <i className="fas fa-paper-plane"></i>
                              &nbsp;Tugas Yang Belum Selesai
                            </NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to="/assignment/conducted">
                            <NavDropdown.Item>
                              <i className="fas fa-paper-plane"></i>
                              &nbsp;Tugas Yang Sudah Selesai
                            </NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                        <LinkContainer to="/teacher/groups">
                          <Nav.Link>
                            <i className="fa fa-users"></i>
                            &nbsp;Grup
                          </Nav.Link>
                        </LinkContainer>
                      </>
                    )}
                    {userInfo && userInfo.category === 'ADMIN' && (
                      <>
                        <LinkContainer to="/teacher">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;LIST GURU
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/teacher/request">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;PERMINTAAN
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/teacher/delete">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;Hapus Media
                          </Nav.Link>
                        </LinkContainer>
                      </>
                    )}
                    {userInfo && userInfo.category === 'STUDENT' && (
                      <>
                        <LinkContainer to="/pastTest">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;TEST SEBELUMNYA
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/upcomingTest">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;TEST YANG DIBERIKAN
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/past-assignment">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;TUGAS SEBELUMNYA
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/upcoming-assignment">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;TUGAS YANG DIBERIKAN
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/student/groups">
                          <Nav.Link>
                            <i className="fa fa-users"></i>
                            &nbsp;Grup
                          </Nav.Link>
                        </LinkContainer>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </>
            )}
            <Nav>
              {userInfo ? (
                <NavDropdown title={userInfo.name.toUpperCase()} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fas fa-user" />
                      &nbsp;PROFIL
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <NavDropdown.Item onClick={logOutHandler}>
                      <i className="fas fa-sign-out-alt" />
                      &nbsp;KELUAR
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-sign-in-alt" />
                      &nbsp;Masuk
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-user-plus" />
                      &nbsp;Daftar
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      )}
    </header>
  );
};

export default Header;
