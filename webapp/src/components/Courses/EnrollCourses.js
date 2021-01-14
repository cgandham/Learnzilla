import React, {Component} from 'react';
// import './enrollCourses.scss';
import { Redirect } from "react-router-dom";
import { Table, Button, Alert } from 'react-bootstrap';
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from '../SideBar/SideBar';
import NavBar from '../NavBar';
class EnrollCourses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      studentid: '',
      currentCourseList: [],
      allCourseList: [],
      newAllCourseList : [],
      allcourseLoaded: false,
      currentCourseLoaded: false,
      selectedIndexes: [],
      currentCourseListNames: [],
      additionSuccess: null,
      removeSuccess: null
    };
    this.updateAllCourseList = this.updateAllCourseList.bind(this);
    this.updateStudentCourseList = this.updateStudentCourseList.bind(this);
    this.handleEnroll = this.handleEnroll.bind(this)
    this.updatecurrentCourseListNames = this.updatecurrentCourseListNames.bind(this)
    this.handleRemoveCourses = this.handleRemoveCourses.bind(this);
    this.RemoveStudentCourse = this.RemoveStudentCourse.bind(this);
  }

  updatecurrentCourseListNames(){
      let tempList = [];
      for (let index = 0; index < this.state.currentCourseList.length; index++) {
        fetch(`/courses/${this.state.currentCourseList[index]}`, {
            method: 'GET'
          })
          .then(res => res.json())
          .then(
            (result) => {
                console.log ("result for course name is "+result.coursename)
                let courseObj = {
                    coursedesc: result.coursedesc,
                    assignment: result.assignment,
                    coursename: result.coursename,
                    coursestartdate: result.coursestartdate,
                    courseenddate: result.courseenddate,
                    coursefinalscrore: result.coursefinalscrore
                }
                console.log(courseObj.coursename)
                // const courseObj = Object.assign({}, request.body);
            tempList.push(courseObj);
            console.log("templist is "+tempList)
            this.setState({
                currentCourseListNames: tempList
            });
            },
            (error) => {
              this.setState({
                allcourseLoaded: false,
                error
            });
          }
        )

          
      }
      
  }

  loadAllCourses() {
    fetch("/courses", {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {
            console.log ("result for all courses is "+result)
          this.setState({
            allcourseLoaded: true,
            allCourseList: result
          });
          this.loadCurrentCourses();
   
        },
        (error) => {
          this.setState({
            allcourseLoaded: false,
            error
        });
      }
    )
    console.log(this.state.allCourseList);
  }

  loadCurrentCourses() {
    const studentID = '5fd97cfa2e2da92eb49db7f2';
    // const studentID = localStorage.getItem("roleid");
    console.log("studentID fetched from roleID is "+studentID)
    fetch(`/students/${studentID}/courses`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {
            console.log ("result for current courses is "+result.courses)
          this.setState({
            currentCourseLoaded: true,
            currentCourseList: result.courses
          });
          this.updateAllCourseList();
        },
        (error) => {
          this.setState({
            currentCourseLoaded: false,
            error
        });
      }
    )
    console.log(this.state.currentCourseList);
  }

  updateStudentCourseList(courseid) {
      const studentid = '5fd97cfa2e2da92eb49db7f2';
      // const studentid = localStorage.getItem("roleid");
      console.log("studentID fetched from roleID is "+studentid)
      // const courseid = '5fd45523feb2286945101382';
      fetch(`/students/${studentid}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {
            console.log("result is "+result)
            let courses= result.message.courses;
            console.log("courses is "+courses)
            let user= result.message.user;
            console.log("user is "+user)
            let newCourse = {
                "_id": `${courseid}`
            }
            courses.push(newCourse)
            console.log(courses);
            fetch(`/students/${studentid}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "courses": courses,
                    "user": user
                  }
                ),
                headers: {"Content-Type": "application/json"}
              })
              .then(res => res.json())
              .then((responseJson) => {
                this.setState({
                    additionSuccess: true})
                console.log("Successfully added course to  the student");
              });
        },
        (error) => {
          this.setState({
            additionSuccess: false,
            error
        });
      }
    )
    
  }


  RemoveStudentCourse(courseid) {
    const studentid = '5fd97cfa2e2da92eb49db7f2';
    // const studentid = localStorage.getItem("roleid");
    console.log("studentID fetched from roleID is "+studentid)
    // const courseid = '5fd45523feb2286945101382';

    fetch(`/students/${studentid}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(
      (result) => {
          console.log("result is "+result)
          let courses= result.message.courses;
          console.log("courses is "+courses)
          let user= result.message.user;
          console.log("user is "+user)
          let courseToRemove =  [];
          for (let index = 0; index < courses.length; index++) {
            if(courses[index] != courseid ){
              courseToRemove.push(courses[index]);
            }
          }          
          
          console.log(courseToRemove);
          fetch(`/students/${studentid}`, {
              method: 'PUT',
              body: JSON.stringify({
                  "courses": courseToRemove,
                  "user": user
                }
              ),
              headers: {"Content-Type": "application/json"}
            })
            .then(res => res.json())
            .then((responseJson) => {
              this.setState({
                  removeSuccess: true})
              console.log("Successfully removed course to  the student");
            });
      },
      (error) => {
        this.setState({
          removeSuccess: false,
          error
      });
    }
  )
  
}

  updateAllCourseList(){
      console.log("in updateAllCourseList")
      let currentAllCourseList = this.state.allCourseList;
      let currentEnrolledCourse = this.state.currentCourseList;
      let newAllCourseList = [];
      for (let index = 0; index < currentEnrolledCourse.length; index++) {
          for (let j = 0; j < currentAllCourseList.length; j++) {
              console.log("Compare = "+currentEnrolledCourse[index] +"  "+ currentAllCourseList[j].id)
              if(currentEnrolledCourse[index] !== currentAllCourseList[j].id){
                newAllCourseList.push(currentAllCourseList[j])
                console.log("Added the course successfully")
              }
          }
      }
      this.setState({
        newAllCourseList: newAllCourseList,
        rows : newAllCourseList
    });
    this.updatecurrentCourseListNames();
  }

  componentDidMount() {
    this.loadAllCourses();
  }


  handleEnroll(name,courseID){
      console.log("courseID is "+courseID)
      this.updateStudentCourseList(courseID);
      this.props.history.push(`/dashboard`);
      if(this.state.additionSuccess){
        this.props.history.push(`/dashboard`);
      }

  }

  handleRemoveCourses(name,courseID){
    console.log("courseID is "+courseID)
    this.RemoveStudentCourse(courseID);
    this.props.history.push(`/dashboard`);
    if(this.state.removeSuccess){
      this.props.history.push(`/dashboard`);
    }
}


  render(){
      
      // if (false) {
      //   return <div>Error: {this.state.error.message}</div>;
      // } else if (!(this.state.allCoursesLoaded || this.state.currentCourseLoaded)) {
      // return <Redirect to="/dashboard" />
      // <div>Loading...</div>;
      // } else {
          let currentCourseList = this.state.currentCourseListNames
          let allCourseList = this.state.allCourseList
          let newAllCourseList = this.state.newAllCourseList
          newAllCourseList = newAllCourseList.filter((item, i, ar) => ar.indexOf(item) === i);
          if(currentCourseList.length> 2){
            alert("You cannot enroll for more courses");
            window.location = '/dashboard';
              // return <div>
              //     {/* <div class="alert alert-primary" role="alert">
              //     Credit hour limit exceeded!! <a href="/dashboard" class="alert-link"></a>. OK, return back to Dashboard
              //   </div> */}
                
              //   {/* <Redirect to="/dashboard" /> */}
              // </div>;
          }
          if(currentCourseList.length == 2){
            alert("You are already enrolled for 2 courses, Kindly remove a course to add another");
          }
          if(currentCourseList.length == 0){
            let isEnrolled = false;
            let stringop = "Not enrolled with any course currently"
          }
        return(
          <>
          <NavBar />
          <Navbar className="sidebar">
                <Navbar.Collapse>
                  <Sidebar />
                </Navbar.Collapse>
          </Navbar>
          <div className="allChildren">
          <div>
                <h3>Current Courses are </h3>
            <div>
            <ul>
                {currentCourseList.map((courseObj,index) =>{
                        return <li key={index}>{courseObj.coursename} <button  onClick={() => this.handleRemoveCourses('/enrollCourses', courseObj.id)}>Remove</button></li>
                } 
                )}
            </ul>
            </div>
                
                <br>
                </br>
                {/* <h3>All Courses are </h3>
                <div>
                <ul>
                    {allCourseList.map((courseObj,index) =>{
                        return <li key={index}>{courseObj.coursename}</li>
                    }
                        
                    )}
                </ul>
                </div> */}
                <h3>New Available Courses</h3>
                <div>
                <ul>
                    {newAllCourseList.map((courseObj,index) =>{
                        return <li key={index}>{courseObj.coursename}<button  onClick={(e) => this.handleEnroll('/enrollCourses', courseObj.id)}>Enroll</button></li>
                    }
                        
                    )}
                </ul>
                </div>
                
            </div>

          </div>
           
            </>
        
        )
      // }
  }



}


export default EnrollCourses;
