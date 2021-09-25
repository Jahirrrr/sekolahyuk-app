/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getStudentRecord } from '../actions/studentRegistrationAction';
import LineChart from '../utils/LineChart';

const Profile = () => {
  const [groupData, setGroupData] = useState([]);
  const [groupLabel, setGroupLabel] = useState([]);
  const [organisationData, setOrganisationData] = useState([]);
  const [organisationLabel, setOrganisationLabel] = useState([]);

  const { userInfo } = useSelector(state => state.userLogin);
  const studentId = userInfo && userInfo._id;
  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    let studentRecord = await getStudentRecord(studentId);

    studentRecord =
      studentRecord && studentRecord.filter(st => st.testId !== null);
    const groupRecord =
      studentRecord &&
      studentRecord.filter(s => s.testId.paperType === 'GROUP');
    const organisationRecord =
      studentRecord &&
      studentRecord.filter(s => s.testId.paperType === 'ORGANISATION');

    let data1 = [];
    let label1 = [];

    groupRecord.map(g => {
      let percentage;
      if (g.score === -1) percentage = 0;
      else percentage = (g.score / g.testId.maxMarks) * 100;
      data1.push(percentage);
      label1.push(g.testId.startTime.substr(0, 10));
    });

    setGroupData(data1);
    setGroupLabel(label1);

    let data2 = [];
    let label2 = [];

    organisationRecord.map(o => {
      let percentage;
      if (o.score === -1) percentage = 0;
      else percentage = (o.score / o.testId.maxMarks) * 100;
      data2.push(percentage);
      label2.push(o.testId.startTime.substr(0, 10));
    });

    setOrganisationData(data2);
    setOrganisationLabel(label2);
  };
  return (
    <Container className="my-3">
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <p>USER PROFILE</p>
        <Row>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Nama :</strong> {userInfo.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email :</strong> {userInfo.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Kategori :</strong> {userInfo.category}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        {userInfo.category === 'STUDENT' && (
          <ListGroup>
            <ListGroup.Item>
              <p>Groups</p>
              <LineChart
                LineData={{
                  labels: groupLabel,
                  datasets: [
                    {
                      label: 'Percentage',
                      data: groupData,
                      fill: false,
                      borderColor: '#742774',
                      lineTension: 0,
                      pointBorderWidth: 4,
                    },
                  ],
                }}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Organisation</p>
              <LineChart
                LineData={{
                  labels: organisationLabel,
                  datasets: [
                    {
                      label: 'Percentage',
                      data: organisationData,
                      fill: false,
                      borderColor: '#742774',
                      lineTension: 0,
                      pointBorderWidth: 4,
                    },
                  ],
                }}
              />
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
    </Container>
  );
};

export default Profile;
