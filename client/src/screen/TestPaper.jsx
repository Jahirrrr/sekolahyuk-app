/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Form, ListGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import { ReactMic } from "react-mic";
import {
  responseSheetOfStudent,
  addAnswerForGivenQuestion,
} from "../actions/responseSheetAction";
import {
  getSinglePaper,
  getTestCategory,
  testEnd,
} from "../actions/testAction";
import Clock from "../component/Clock";
import { uploadImage } from "./../actions/snapshots";
import { uploadAudio } from "./../actions/audio";
//import { getTestPdf } from "./../actions/testAction";
import download from "downloadjs";
import { uploadPdf } from "./../actions/responseSheetAction";
import { resultGeneratePdf } from "./../actions/generateResultAction";
import {
  snapInterval,
  audioRecLength,
  audioRecInterval,
} from "./../constants/mediaConstant";

const TestPaper = ({ history }) => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get("testId");
  const studentId = query.get("studentId");
  const webcamRef = useRef(null);
  const webcamRef2 = useRef(null);
  let intervalId = useRef(null);
  let intervalId2 = useRef(null);
  let audioIntervalId = useRef(null);
  const [answer, setAnswer] = useState([]);
  const [saveAnswer, setSaveAnswer] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [record, setRecord] = useState(false);

  let { paper } = useSelector((state) => state.singleTestPaper);

  const [flag, setFlag] = useState(true);

  const [selectedFile, setSelectedFile] = useState("upload pdf");
  const [responsePdf, setResponsePdf] = useState(null);
  // const [testCategory, setTestCategory] = useState("");
  const pdf = useRef(null);
  const testCategory = useRef("");
  const dispatch = useDispatch();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationhandler"));
    if (!paper || paper._id !== testId) {
      // let category;
      // async function getCategory() {
      //   testCategory.current = await getTestCategory(testId);
      //   //  console.log(category);
      //   // setTestCategory(category);
      // }
      // getCategory();
      dispatch(getSinglePaper(testId));
      dispatch({ type: "SET_URL", payload: window.location.pathname });
    }

    async function responseSheet() {
      const res = await responseSheetOfStudent({ testId, studentId });
      //automatic fills option after reloading
      if (typeof res !== "string" && res.responses !== null) {
        let response = res && res.responses.map((r) => [...r.chosenOption]);
        response = [].concat(...response);
        setSaveAnswer(response);
      }
    }

    responseSheet();
  }, []);
  useEffect(() => {
    if (paper && paper._id === testId) {
      if (paper && paper.isSnapshots === true) {
        checkCameraPerm();
        intervalId.current = setInterval(async function () {
          const image = webcamRef.current.getScreenshot({
            height: 420,
            width: 480,
          });
          if (image) await uploadImage(testId, studentId, image);

          //console.log(intervalId);
          // console.log(image);
        }, snapInterval);
        // intervalId2.current = setInterval(function () {
        //   const img = webcamRef2.current.getScreenshot();
        //   if (img) {
        //     clearInterval(intervalId2.current);
        //   } else {
        //     window.alert("Allow permission to camera");
        //     //console.log("allow permission to camer");
        //   }
        //   console.log("checking", img);
        // }, 5000);
      }
      if (paper && paper.isAudioRec === true) {
        checkMicPerm();
        audioIntervalId.current = setInterval(function () {
          setRecord(true);
          setTimeout(function () {
            setRecord(false);
          }, audioRecLength);
        }, audioRecInterval);
      }
    }
  }, [paper]);

  const submitOptionHandler = (e) => {
    let arr = [...answer];

    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr = arr.filter((a) => a !== e.target.value);
    }

    setAnswer(arr);

    if (!e.target.checked) {
      let temp = [...saveAnswer];
      temp = temp.filter((t) => t !== e.target.value);
      setSaveAnswer(temp);
    }
  };
  const totalCount = paper && paper.questions.length;
  const arr = [];
  for (var i = 0; i < totalCount; i++) arr.push(i + 1);
  const checkMicPerm = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("success!");
      })
      .catch((e) => {
        setFlag(false);
        window.alert("Izinkan Mic Dinyalakan");
        setTimeout(function () {
          checkMicPerm();
        }, 5000);
      });
  };

  const checkCameraPerm = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("success!");
      })
      .catch((e) => {
        setFlag(false);
        window.alert("Izinkan Kamera Dinyalakan");
        setTimeout(function () {
          checkCameraPerm();
        }, 5000);
      });
  };

  const resetAnswerHandler = () => {
    setAnswer([]);
    if (questionNumber !== totalCount) setQuestionNumber(questionNumber + 1);
  };

  const submitHandler = async () => {
    const temp = [...answer];
    for (var i = 0; i < answer.length; i++) saveAnswer.push(answer[i]);
    setSaveAnswer(saveAnswer);

    //console.log(answer);
    await addAnswerForGivenQuestion({
      testId,
      studentId,
      chosenOption: answer,
      questionId: paper.questions[questionNumber - 1]._id,
    });
    resetAnswerHandler();
  };

  const testSubmitHandler = async (id) => {
    clearInterval(intervalId.current);
    //clearInterval(intervalId2.current);
    clearInterval(audioIntervalId.current);
    await testEnd({ testId, studentId });

    if (paper.category === "PILIHANGANDA") {
      // history.push(
      //   `/student/test/result?testId=${testId}&studentId=${studentId}`
      // );
      history.push(`/student/test/submitted`);
    } else {
      //await resultGeneratePdf(testId, studentId);
      //console.log(paper.category);
      history.push(`/student/test/submitted`);
    }
  };

  const downloadPdf = () => {
    //console.log(paper.pdf);
    download(paper.pdf, "Testpaper.pdf", "application/pdf");
  };

  function onStop(recordedBlob) {
    // console.log("recordedBlob is: ", recordedBlob);
    const reader = new FileReader();
    reader.readAsDataURL(recordedBlob.blob);
    reader.onloadend = async function () {
      const base64String = reader.result;
      //      console.log("Base64 String - ", base64String);
      await uploadAudio(testId, studentId, base64String);
    };
  }
  const fileInputHandler = (event) => {
    setSelectedFile(event.target.files[0].name);
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      setResponsePdf(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadPdfHandler = async () => {
    await uploadPdf(testId, studentId, responsePdf);
    await resultGeneratePdf(testId, studentId);
  };

  return (
    <div style={{ marginLeft: "100px", marginTop: "80px", padding: "20px" }}>
      {paper && paper.isAudioRec && (
        <div style={{ display: "none" }}>
          <ReactMic record={record} onStop={onStop} />
        </div>
      )}
      {paper && paper.isSnapshots && paper._id === testId && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.3}
            width={0}
          />
          {/* <Webcam
            audio={false}
            ref={webcamRef2}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.3}
            width={0}
          /> */}
        </>
      )}
      <Row>
        <Col md={8}>
          {flag &&
            paper &&
            // testCategory.current.length > 1 &&
            paper.category === "PILIHANGANDA" && (
              <Container>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>QUESTION: {questionNumber}</h4>
                    <p style={{ fontSize: "20px" }}>
                      {paper.questions[questionNumber - 1].questionBody}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h4 style={{ textAlign: "left" }}>
                      <strong>Options:</strong>
                    </h4>

                    {paper.questions[questionNumber - 1].options.map((opt) => (
                      <p style={{ fontSize: "20px" }} key={opt._id}>
                        <Form.Check
                          type="checkbox"
                          value={opt._id}
                          label={opt.optionBody}
                          checked={
                            saveAnswer.filter((ans) => ans === opt._id).length
                              ? true
                              : answer.filter((a) => a === opt._id).length
                              ? true
                              : false
                          }
                          onChange={(e) => submitOptionHandler(e)}
                        />
                      </p>
                    ))}
                  </ListGroup.Item>
                  <br />
                  <br />
                </ListGroup>
                <Button
                  variant="outline-primary"
                  onClick={() => setQuestionNumber(questionNumber - 1)}
                  disabled={questionNumber === 1}
                >
                  Prev
                </Button>{" "}
                <Button
                  variant="outline-primary"
                  onClick={() => resetAnswerHandler()}
                  disabled={questionNumber === totalCount}
                >
                  Next
                </Button>{" "}
                <Button
                  variant="outline-primary"
                  onClick={() => submitHandler()}
                  disabled={
                    questionNumber - 1 === totalCount || answer.length === 0
                  }
                >
                  Save & Next
                </Button>
              </Container>
            )}
          {flag && paper && paper.category === "PDF" && (
            <Container>
              <ListGroup.Item style={{ margin: "20px" }}>
                <h3 style={{ color: "black" }}> Test Paper:</h3>
                <Button
                  variant="outline-primary"
                  className="btn-block"
                  onClick={() => downloadPdf()}
                >
                  Download
                </Button>
              </ListGroup.Item>

              <ListGroup.Item>
                <Form>
                  <Form.File
                    id="custom-file"
                    label={selectedFile}
                    onChange={(e) => fileInputHandler(e)}
                    custom
                  />
                </Form>
                <br />

                <Button
                  variant="outline-primary"
                  type="submit"
                  className="btn-block"
                  onClick={uploadPdfHandler}
                  // disabled={
                  //   selectedQuestions.length || category === "PDF" ? false : true
                  // }
                >
                  Submit
                </Button>
              </ListGroup.Item>
            </Container>
          )}
        </Col>

        <Col md={3.5}>
          <Row style={{ marginTop: "-100px" }}>
            {paper && (
              <Clock
                testId={paper._id}
                time={paper.startTime}
                duration={paper.duration}
                endTest={testSubmitHandler}
              />
            )}
          </Row>
          <Row>
            <Button
              variant="outline-primary"
              style={{ marginLeft: "180px", marginTop: "10px" }}
              onClick={() => testSubmitHandler()}
            >
              End Test
            </Button>
          </Row>
          <Row style={{ position: "center" }}>
            {arr &&
              arr.map((a, index) => (
                <div
                  key={index}
                  className="box"
                  style={{
                    backgroundColor: `${
                      questionNumber === a ? "green" : "lightblue"
                    }`,
                  }}
                >
                  {a}
                </div>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TestPaper;
