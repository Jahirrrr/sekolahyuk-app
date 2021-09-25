/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { joinGroup, getAllGroup } from '../actions/groupAction';
import Group from '../component/Group';
import Loader from '../utils/Loader';
import { GROUP_LIST_SUCCESS } from '../constants/groupConstant';

const StudentGroup = () => {
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [groupCode, setGroupCode] = useState('');

  const { loading, groups } = useSelector(state => state.groupList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!groups) dispatch(getAllGroup());
  }, []);

  const joinGroupHandler = async e => {
    try {
      e.preventDefault();
      setLoader(true);
      const group = await joinGroup(groupCode);
      if (group) {
        setGroupCode('');

        const arr = [...groups, group];
        dispatch({ type: GROUP_LIST_SUCCESS, payload: arr });
      }
      setLoader(false);
    } catch (ex) {}

    setShow(false);
  };

  return (
    <Container className="my-3">
      {loading && <Loader />}
      {loader && <Loader />}
      <Row>
        <Col>
          <h3 style={{ color: 'black' }}>GROUPS</h3>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button variant="outline-primary" onClick={() => setShow(true)}>
            <i className="fas fa-plus"></i> <i className="fa fa-users"></i> Join
            Group
          </Button>
        </Col>
      </Row>
      <Row>
        {groups &&
          groups.map(group => (
            <Col key={group._id} sm={12} md={6} lg={4} xl={3}>
              <Group group={group} />
            </Col>
          ))}
      </Row>
      {show && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Group
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => joinGroupHandler(e)}>
              <Form.Group controlId="groupCode">
                <Form.Label>Group Code</Form.Label>
                <Form.Control
                  required
                  placeholder="Group Code"
                  minLength="6"
                  type="text"
                  value={groupCode}
                  aria-describedby="code"
                  onChange={e => setGroupCode(e.target.value)}
                />
                <Form.Text id="code" muted>
                  code length must be greater than 5
                </Form.Text>
              </Form.Group>

              <Button
                className="btn-block"
                variant="outline-primary"
                type="submit"
              >
                Join
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default StudentGroup;
