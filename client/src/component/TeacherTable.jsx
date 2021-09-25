/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from 'react';
import { Table, Row, Col, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  removeTeacher,
  teacherReqList,
} from '../actions/teacherAction';
import { updateTeacher } from './../actions/teacherAction';

const TeacherTable = ({ teacher, permission }) => {
  const dispatch = useDispatch();
  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(removeTeacher(teacher, id, permission));
    }
  };

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3 style={{ color: 'black' }}>Teacher List</h3>
          </Col>
          {!permission && (
            <Col className="text-right">
              <Button
                className="my-3"
                onClick={() => dispatch(teacherReqList())}
              >
                <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
              </Button>
            </Col>
          )}
        </Row>
        <Table hover bordered striped responsive className="table-centered">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PERMISSION</th>
              <th>&nbsp;&nbsp;REMOVE&nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {teacher &&
              teacher.map((teacher, index) => (
                <tr key={teacher._id} style={{ textAlign: 'center' }}>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>
                    {permission && (
                      <Button
                        variant="outline-primary"
                        className="btn btn-block"
                        onClick={() =>
                          dispatch(updateTeacher(teacher, false))
                        }
                      >
                        Revoke
                      </Button>
                    )}
                    {!permission && (
                      <Button
                        variant="outline-primary"
                        className="btn btn-block"
                        onClick={() =>
                          dispatch(updateTeacher(teacher, true))
                        }
                      >
                        Grant
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="btn-sm"
                      onClick={() => deleteHandler(teacher._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TeacherTable;
