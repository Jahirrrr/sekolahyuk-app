/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header";
import Register from "./screen/Register";
import Login from "./screen/Login";
import QuestionList from "./screen/QuestionList";
import QuestionCreate from "./screen/QuestionCreate";
import TestCreate from "./screen/TestCreate";
import StudentRegistered from "./screen/StudentRegistered";
import TestPaper from "./screen/TestPaper";
import Instruction from "./component/Instruction";
import TeacherList from "./screen/TeacherList";
import TeacherReqList from "./screen/TeacherReqList";
import StudentResult from "./screen/StudentResult";
import EmailNotification from "./screen/EmailNotification";
import Snapshots from "./screen/Snapshots";
import HomeScreen from "./screen/HomeScreen";
import TestConductedList from "./screen/TestConductedList";
import TestNotConductedList from "./screen/TestNotConductedList";
import StudentPrevTest from "./screen/StudentPrevTest";
import StudentUpcomingTest from "./screen/StudentUpcomingTest";
import Audio from "./screen/Audio";
import Profile from "./screen/Profile";
import TeacherGroup from "./screen/TeacherGroup";
import StudentGroup from "./screen/StudentGroup";
import TestSubmitted from "./screen/TestSubmitted";
import GroupDetails from "./screen/GroupDetails";
import DeleteMedia from "./screen/DeleteMedia";
import AssignmentNotConductedList from "./screen/AssignmentNotConducted";
import AssignmentConductedList from "./screen/AssignmentConducted";
import StudentPrevAssignment from "./screen/StudentPrevAssignment";
import StudentUpcomingAssignment from "./screen/StudentUpcomingAssignment";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer autoClose={2000} />
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />

        <Route path="/questions" component={QuestionList} exact />
        <Route path="/pastTest" component={StudentPrevTest} />
        <Route path="/upcomingTest" component={StudentUpcomingTest} />
        <Route path="/past-assignment" component={StudentPrevAssignment} />
        <Route
          path="/upcoming-assignment"
          component={StudentUpcomingAssignment}
        />

        <Route path="/teacher/groups/:id" component={GroupDetails} exact />
        <Route path="/teacher/groups" component={TeacherGroup} />
        <Route path="/student/groups/:id" component={GroupDetails} exact />
        <Route path="/student/groups" component={StudentGroup} />

        <Route path="/questions/create" component={QuestionCreate} />
        <Route path="/tests/create" component={TestCreate} />
        <Route path="/tests/edit/:testId" component={TestCreate} />
        <Route
          path="/tests/notConducted"
          component={TestNotConductedList}
          exact
        />
        <Route
          path="/assignment/notConducted"
          component={AssignmentNotConductedList}
          exact
        />
        <Route path="/tests/conducted" component={TestConductedList} exact />
        <Route
          path="/assignment/conducted"
          component={AssignmentConductedList}
          exact
        />
        <Route
          path="/student/registration/test/:id/emailsent"
          component={EmailNotification}
        />
        <Route
          path="/student/registration/test/:id"
          component={StudentRegistered}
        />
        <Route path="/student/test/result" component={StudentResult} />
        <Route path="/student/test/start" component={TestPaper} />
        <Route path="/student/test/snapshots" component={Snapshots} />
        <Route path="/student/test/submitted" component={TestSubmitted} />
        <Route path="/student/test/audio" component={Audio} />
        <Route path="/student/test" component={Instruction} exact />
        <Route path="/teacher/request" component={TeacherReqList} />
        <Route path="/teacher/delete" component={DeleteMedia} />
        <Route path="/teacher" component={TeacherList} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
