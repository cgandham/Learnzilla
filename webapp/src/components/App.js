import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NavBar from './NavBar';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Deregister from './Authentication/Deregister';
import CreateCourses from './Courses/CreateCourses';
import EditTeacher from './Teachers/EditTeacher';
import CreateAssignments from './Assignments/CreateAssignments';
import AllGradesContainer from './Grades/AllGradesContainer';
import CourseAssignScores from './Grades/CourseAssignScores';
import Dashboard from './Dashboard';
import GradeAnalytics from './Grades/GradeAnalytics';
import Profile from './Profile/ProfileContainer';
import SuccessPage from './SuccessPage/SuccessPage';
import GradeStudents from './Grades/GradeStudents';
import AssignmentContainer from './Assignments/AssignmentContainer';
import GradeCourse from './Grades/GradeCourse';
import TeacherViewGrades from './Teachers/ViewGrades';
import EvaluateStudFinalGrade from './Grades/EvaluateStudFinalGrade';
import EnrollCourses from './Courses/EnrollCourses';
import DeregisterTeacher from './Authentication/DeregisterTeacher';



class App extends Component {

  render() {
    return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route path='/grades'>
            {(props) => <AllGradesContainer {...props}/>}
        </Route>
        <Route path='/HW-scores'>
            {(props) => <CourseAssignScores {...props}/>}
        </Route>
            <Route path="/register" component={Register} />
            <Route path="/deregister" component={Deregister} />
            <Route path="/courses/create" component={CreateCourses} />
            <Route path="/courses/Assignments" component={AssignmentContainer} />
            <Route path="/teachers/edit" component={EditTeacher} />
            <Route path="/students/edit" component={GradeStudents} />
            <Route path="/assignments/create" component={CreateAssignments} />
            <Route path="/home" component={NavBar} />
            <Route path="/students/grade" component={GradeCourse} />
            <Route path="/enrollcourses" component={EnrollCourses} />
            <Route path="/teacher/deregister" component={DeregisterTeacher} />
            {/* <Route path="/grades" component={AllGradesContainer} /> */}
            {/* <Route path="/HW-scores" component={CourseAssignScores} /> */}
            {/* <Route path="/" component={Home} /> */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/analytics" component={GradeAnalytics} />
            <Route path="/profile" component={Profile} />
            <Route path="/success" component={SuccessPage} />
            <Route path="/login" key="login" component={Login} />
            {/* <Route exact path="/" component={Home} /> */}
            <Route path="/viewGrades" component={TeacherViewGrades} />
            <Route path="/students/finalgrade" component={EvaluateStudFinalGrade} />
        </Switch>
      </BrowserRouter>
    </div>

  )
  }
}
export default App;
