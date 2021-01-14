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

class GradeStudents extends Component {

  // constructor
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
    this.updateAssignmentScore = this.updateAssignmentScore.bind(this);
  }

  componentDidMount() {
    let id = JSON.parse(localStorage.getItem("user")).id;
    let url = "/teachers/users/" + id;
  //  alert(url);
    this.getTeacherIdCourseId(url);
  }

  // Get teacher and course id from userid
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
          this.loadCourses();
          this.loadStudents();
        },
        (error) => {
          this.setState({
            error
        });
      }
    )
  }

  // Load assignments details for a particular course
  loadCourses() {
    let id = this.state.courseid;
    let url = "/courses/" + id;
    fetch(url, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            courseLoaded: true,
            courseData: result,
            assignmentList: result.assignment
          });
        //  console.log(this.state.assignmentList);
        },
        (error) => {
          this.setState({
            courseLoaded: false,
            error
        });
      }
    )

  }

  // load all students for a particular course
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


  updateStudent(studentid, grade) {
    alert(studentid + " " + grade);
    let editUrl = "/students/" + studentid;
    fetch(editUrl, {
      method: 'PUT',
      body: JSON.stringify({
          "finalgrade": grade
        }
      ),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then((responseJson) => {
      console.log(responseJson);
    });
  }

    // update assignment score
  updateAssignmentScore(assignmentid, grade, feedback) {
    alert(assignmentid + " " + grade + " " + feedback);
    let editUrl = "/assignments/" + assignmentid;
    fetch(editUrl, {
      method: 'PUT',
      body: JSON.stringify({
          "assignmentscrore": grade,
          "feedback": feedback
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
    // console.log(id);
    // console.log(val);
    this.setState({
      [id]: val
    });

  }

  submitForm(e){
    e.preventDefault();
    let studentid = this.state.studentid;
    let grade = this.state.grade;
    let feedback = this.state.feedback;
    let assignmentid = this.state.assignmentid;
    this.updateAssignmentScore(assignmentid, grade, feedback);
    //this.updateStudent(studentid, grade);
    //alert("Course is assigned successfully! Redirect to SuccessPage");
    this.props.history.push('/dashboard');
  }

  // Render grade assignment form
  render(){
      if (this.state.error) {
        return <div>Error: {this.state.error.message}</div>;
      } else if (!this.state.studentLoaded || !this.state.courseLoaded) {
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

            <FormGroup controlId="assignmentid">
              <FormLabel>Assignment ID</FormLabel>
              <FormControl as="select" value={this.state.value} onChange={this.handleInput}>
                <option placeholder="Select Assignment" > Select Assignment </option>
                {this.state.assignmentList.map((t, index) => <option key={index} value={t} >{t}</option>)}
              </FormControl>
            </FormGroup>


            <FormGroup controlId="grade">
              <FormLabel>Student Grade</FormLabel>
              <FormControl type="Number" value={this.state.value} placeholder="Enter Student Grade" onChange={this.handleInput} />
            </FormGroup>

            <FormGroup controlId="feedback">
              <FormLabel>Feedback</FormLabel>
              <FormControl type="text" value={this.state.value} placeholder="Enter Feedback" onChange={this.handleInput} />
            </FormGroup>



            <FormGroup>
              <Button type="submit">Evaluate Student</Button>
            </FormGroup>
          </Form>
          </div>
        )
      }
  }
}


export default GradeStudents;
