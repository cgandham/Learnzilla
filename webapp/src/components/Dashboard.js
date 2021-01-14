import React from 'react';
import NavBar from './NavBar';
import CourseContainer from './CourseContainer'
import './../styles/Modules/CourseCards.scss'
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from './SideBar/SideBar';
//import './SideBar/SideBar.scss';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import { getMyCourses } from './../store/actions/course.action';
import { getCoursesGrades } from './../store/actions/grade.action';




// const reduxProps = state => {
//     return ({
//       courses: state.course.courseState
//       }
//     )
//   };

const reduxProps = state => {
  return ({
      grades: state.grades.coursesGrades 
  })
};


class Dashboard extends React.Component {

  constructor(props){
    super(props);
    let userState = JSON.parse(localStorage.getItem("user"));
    let id = userState._id;
    console.log("userId is " + id)
    let role = userState.role;
    let URL;
    if(role==="Teacher"){
      URL = "/teachers/users/"
    } else if(role==="Student"){
      URL = "/students/users/"
    }

  let roleID;
    fetch(URL+id, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then((responseJson) => {
          console.log("Role id is " + responseJson.message[0].id);
          roleID =  (responseJson.message[0].id);
          if (localStorage.getItem("roleid") === null) {
            localStorage.setItem("roleid", (roleID));
          }
          // if(role==="Student"){this.props.getMyCourses(roleID);}
          if(role==="Student"){this.props.getCoursesGrades(roleID);}

      })
      .catch(err => console.log(err)
      );
  }

    render(){
    
      let courses = this.props.grades;
      if(JSON.parse(localStorage.getItem("user")).role === "Teacher"){
        courses = [

        ];
      }
      let courseList  = <div></div>;
      if(courses.length !== 0){
           courseList = courses.map((c, i) => {
              return (
                  <>
              <CourseContainer key={i} course={c}>
              </CourseContainer>
           </>
              )
          });
      }
      

        return (
        <>
        <NavBar />
        <Navbar className="sidebar">
              <Navbar.Collapse>
                <Sidebar />
              </Navbar.Collapse>
        </Navbar>
        <h1>Dashboard</h1>
        <div className="allChildren">
        <ul>
            {courseList}
        </ul>
        </div>

        </>
        );
    }
}
export default connect(reduxProps, { getCoursesGrades,getMyCourses })(Dashboard);
