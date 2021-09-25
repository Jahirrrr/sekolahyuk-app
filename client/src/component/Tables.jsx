/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import errorHandler from "../errorHandler";
import Loader from "../utils/Loader";
import { getGroupStudents } from "../actions/groupAction";
import { useSelector } from "react-redux";

const Tables = () => {
  const [students, setStudents] = useState([]);
  const [loader, setLoader] = useState(false);

  const { id: groupId } = useParams();

  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      setLoader(true);
      const student = await getGroupStudents(groupId);
      setStudents(student);
      setLoader(false);
    } catch (ex) {
      errorHandler(ex);
    }
  };
  return (
    <>
      <Button
        variant="outline-primary"
        className="my-3"
        onClick={() => getStudents()}
      >
        <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
      </Button>
      {loader && <Loader />}
      <Table hover bordered striped responsive className="table-centered">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Nama</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((stud, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{stud.name}</td>
                <td>{stud.email}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default Tables;
