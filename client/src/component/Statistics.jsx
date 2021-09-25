/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, Button, Col, Row } from 'react-bootstrap';
import { downloadResult } from '../actions/studentRegistrationAction';
import { getScoreOfAllStudents } from '../actions/testAction';
import BarCharts from '../utils/BarCharts';
import DoughnutChart from '../utils/DoughnutChart';
import download from 'downloadjs';
import { bgcolor, bordercolor } from '../utils/Color';
import { base64StringToBlob } from 'blob-util';

const Statistics = ({ id }) => {
  const [scorelable, setScorelable] = useState([]);
  const [scoredata, setScoredata] = useState([]);
  const [bgColor, setbgColor1] = useState([]);
  const [borColor, setborColor1] = useState([]);
  const [passData, setPassData] = useState([0, 0]);
  const [statData, setStatData] = useState([0, 0, 0, 0, 0, 0]);
  const [totalStudents, setTotalStudents] = useState(0);

  const { paper } = useSelector(state => state.singleTestPaper);
  useEffect(() => {
    if (paper) getStudentsMarks();
  }, [paper]);

  const getStudentsMarks = async () => {
    const resultData = await getScoreOfAllStudents(id);
    setTotalStudents(resultData.length);
    if (resultData) {
      let p = 0;
      let f = 0;
      let p90_100 = 0;
      let p80_90 = 0;
      let p70_80 = 0;
      let p60_70 = 0;
      let p50_60 = 0;
      let below50 = 0;
      var pc = 0;
      var maxi = -1;
      resultData.map((d, i) => {
        pc = (d.score / paper.maxMarks) * 100;
        if (pc >= 91) {
          p90_100++;
        } else if (pc >= 81) {
          p80_90++;
        } else if (pc >= 71) {
          p70_80++;
        } else if (pc >= 61) {
          p60_70++;
        } else if (pc >= 50) {
          p50_60++;
        } else {
          below50++;
        }

        if (d.score >= d.maxMarks / 3) {
          p++;
        } else {
          f++;
        }

        if (d.score > maxi) {
          maxi = d.score;
        }
      });

      var dp = [];
      var label = [];
      var bgColor1 = [];
      var borcolor1 = [];

      for (let i = 0; i <= maxi; i++) {
        dp.push(0);
        label.push(i);
        bgColor1.push(bgcolor[i]);
        borcolor1.push(bordercolor[i]);
      }

      resultData.map((d, i) => {
        dp[d.score]++;
      });

      setScorelable(label);
      setScoredata(dp);
      setbgColor1(bgColor1);
      setborColor1(borcolor1);
      setPassData([f, p]);
      setStatData([p90_100, p80_90, p70_80, p60_70, p50_60, below50]);
    }
  };

  const downloadResultHandler = async id => {
    const str = await downloadResult(id);
    var blob = base64StringToBlob(
      str,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    download(
      blob,
      'Result.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
  };
  return (
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col md={2}>
              <Button
                className="btn btn-block"
                variant="outline-danger"
                onClick={() => downloadResultHandler(id)}
              >
                Download
              </Button>
            </Col>
            <Col md={10}>
              <p style={{ fontSize: '20px' }}>
                Dowload the test result excel sheet
              </p>
            </Col>
          </Row>
        </ListGroup.Item>
        </ListGroup>
  );
};

export default Statistics;
