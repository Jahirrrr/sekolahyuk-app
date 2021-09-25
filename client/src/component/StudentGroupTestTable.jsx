/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const StudentTestTable = ({ testPapers, isShow, all }) => {
  const { userInfo } = useSelector(state => state.userLogin);

  const studentId = userInfo && userInfo._id;
  const history = useHistory();

  const resultHandler = testId => {
    history.push(
      `/student/test/result?testId=${testId}&studentId=${studentId}`
    );
  };

  const enterhandler = testId => {
    history.push(`/student/test?testid=${testId}&studentid=${studentId}`);
  };

  return (
    <Table responsive hover bordered striped className="table-centered">
      <thead>
        <tr>
          <th>SUBJECT</th>
          <th>TITLE</th>
          {all && <th>PAPERTYPE</th>}
          <th>DURATION(IN MIN)</th>
          <th>CATEGORY</th>
          {isShow ? (
            <>
              <th>START TIME</th>
              <th>ENTER</th>
            </>
          ) : (
            <th>RESULT</th>
          )}
        </tr>
      </thead>
      <tbody>
        {testPapers &&
          testPapers.map(test => (
            <tr key={test._id}>
              <td>{test.subject}</td>
              <td>{test.title}</td>
              {all && <td>{test.paperType} TEST</td>}
              <td>{test.duration}</td>
              <td>{test.category}</td>
              {isShow ? (
                <>
                  <td>Date - {test.startTime.substr(0, 10)}</td>
                  <td>
                    {test.paperType === 'ORGANISATION' ? (
                      'Check mail'
                    ) : (
                      <Button
                        variant="outline-primary"
                        className="btn-block"
                        onClick={() => enterhandler(test._id)}
                      >
                        Enter
                      </Button>
                    )}
                  </td>
                </>
              ) : (
                <td>
                  <Button
                    variant="outline-primary"
                    className="btn-block"
                    onClick={() => resultHandler(test._id)}
                  >
                    Result
                  </Button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default StudentTestTable;
