// Import statements
import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, FormLabel,} from 'react-bootstrap';
import { removeError } from '../../store/actions/error.action';
import { logoutUser } from '../../store/actions/user.action';
import NavBar from '../NavBar';
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from '../SideBar/SideBar';
// import './GradeStudents.scss';

const userreduxProps = state => {
  return ({
    auth: state.user.authUser
  })
};

class GradeCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      teacherid: '',
      courseid: '',
      studentid: '',
      assignmentid: '',
      grade: 0,
      feedback: '',
      studentList: [],
      courseData: null,
      assignmentList: [],
      studentLoaded: false,
      teacherLoaded: false,
      courseLoaded: false
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getTeacherIdCourseId = this.getTeacherIdCourseId.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  componentDidMount() {
    let id = JSON.parse(localStorage.getItem("user")).id;
    let url = "/teachers/users/" + id;
  //  alert(url);
    this.getTeacherIdCourseId(url);
  }


// Get teacher id and course id from user id.
  getTeacherIdCourseId(url)  {
    fetch(url, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result.message[0]);
          this.setState({
            teacherid: result.message[0].id,
            courseid: result.message[0].course
          });
          this.loadStudents();
        },
        (error) => {
          this.setState({
            error
        });
      }
    )
  }

  // Load all students for that particular course
  loadStudents() {
    let id = this.state.courseid;
    let url = "/courses/" + id + "/students";
    fetch(url, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            studentLoaded: true,
            studentList: result.students
          });
        },
        (error) => {
          this.setState({
            studentLoaded: false,
            error
        });
      }
    )
  }

  // Update final grade for students for that particular course
  updateStudent(courseid, grade) {
    //alert(courseid + " " + grade);
    let editUrl = "/courses/" + courseid;
    fetch(editUrl, {
      method: 'PUT',
      body: JSON.stringify({
          "coursefinalscrore": grade
        }
      ),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then((responseJson) => {
      console.log(responseJson);
    });
  }



  handleInput(e) {
    let id = e.target.id;
    let val = e.target.value;
    this.setState({
      [id]: val
    });

  }

  submitForm(e){
    e.preventDefault();
    let courseid = this.state.courseid;
    let grade = this.state.grade;
    this.updateStudent(courseid, grade);
    //alert("Course is assigned successfully! Redirect to SuccessPage");
    this.props.history.push('/dashboard');
  }


  // Rendering Grade course form
  render(){
      if (this.state.error) {
        return <div>Error: {this.state.error.message}</div>;
      } else if (!this.state.studentLoaded) {
      return <div>Loading...</div>;
      } else {
        return(
          <div>
          <NavBar />
          <Navbar className="sidebar">
                <Navbar.Collapse>
                  <Sidebar />
                </Navbar.Collapse>
          </Navbar>
          <Form className="formclass" onSubmit={this.submitForm}>
            <FormGroup controlId="studentid">
              <FormLabel>Student ID</FormLabel>
              <FormControl as="select" value={this.state.value} onChange={this.handleInput}>
                <option placeholder="Select Student" > Select Student </option>
                {this.state.studentList.map((t, index) => <option key={index} value={t} >{t}</option>)}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="grade">
              <FormLabel>Student Grade</FormLabel>
              <FormControl type="Number" value={this.state.value} placeholder="Enter Student Grade" onChange={this.handleInput} />
            </FormGroup>

            <FormGroup>
              <Button type="submit">Grade Course</Button>
            </FormGroup>
          </Form>
          </div>
        )
      }
  }
}


export default GradeCourse;
