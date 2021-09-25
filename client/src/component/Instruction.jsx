/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { checkTestStart, startTestTime } from '../actions/testAction';
import Timer from '../utils/Timer';

const Instruction = ({ history }) => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get('testid');
  const studentId = query.get('studentid');

  const { userInfo } = useSelector(state => state.userLogin);

  const [show, setShow] = useState();
  const [testTime, setTestTime] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      history.push(
        `/login?redirect=student/test?testid=${testId}&studentid=${studentId}`
      );
    } else getTestTime();

    async function getTestTime() {
      const time = await startTestTime(testId);
      if (time) setTestTime(time.startTime);
      else getTestTime();
    }
  }, []);

  const submitHandler = async id => {
    const start = await checkTestStart(testId);
    //console.log(start);
    if (start) {
      history.push(
        `/student/test/start?testId=${testId}&studentId=${studentId}`
      );
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <div className="instaruction-page-wrapper">
        <div>
          <div className="clock">
            <h3>Time Left</h3>
            <div className="stopwatch-card">
              <p>
                {testTime && (
                  <Timer
                    time={testTime}
                    duration={-1}
                    testId={testId}
                    endTest={submitHandler}
                  />
                )}
              </p>
            </div>
          </div>
          <div className="instruction-page-inner">
            <h2>Instruksi Mengerjakan Test:</h2>
            <h4>1. Baca Doa Terlebih Dahulu</h4>
            <h4>2. Kerjakan Dengan Teliti</h4>
            <h4>
              3. Kerjakan Dengan Santuy, Tydack Terburu-Buru
            </h4>
            <h4>
              4. Kerjakan Tepat Dengan Waktu, Jangan Sampai Waktunya Habis
            </h4>
            <h4>
              5. Jika Sudah Selesai Mengerjakan Satu Soal, Klik 'Save&Next'.{' '}
            </h4>
            <h4>
              6. Begitupun Dengan Soal Selanjutnya, Lalu Ketika Sudah Selesai Mengerjakan
              Test, Klik 'End test'
            </h4>
            <h4>
              <b>NOTE :</b>Selamat Mengerjakan.
            </h4>
            <div className="proceed-to-test-button">
              <Button
                style={{ float: 'right' }}
                variant="outline-primary"
                icon="caret-right"
                onClick={() => submitHandler()}
              >
                Proceed To Test
              </Button>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="example-custom-modal-styling-title"
          variant="success"
        >
          <Modal.Body>
            <div className="justify-content-centre">
              <p style={{ marginLeft: '80px' }}>Test is not started Yet</p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Instruction;
