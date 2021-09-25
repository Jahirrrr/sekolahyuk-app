/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Group = ({ group }) => {
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.userLogin);
  const enterGroupHandler = () => {
    if (userInfo.category === "TEACHER") {
      history.push(`/teacher/groups/${group._id}`);
    } else {
      history.push(`/student/groups/${group._id}`);
    }
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Header variant="dark" style={{ color: "black" }}>
        <Card.Title as="div">
          <strong>{group.groupName}</strong>
          <p style={{ fontSize: "15px" }}>Code:{group.groupCode}</p>
        </Card.Title>
      </Card.Header>
      <Card.Body></Card.Body>
      <Card.Footer>
        <Button
          variant="outline-primary"
          className="btn-block"
          onClick={() => enterGroupHandler()}
        >
          Enter
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Group;
