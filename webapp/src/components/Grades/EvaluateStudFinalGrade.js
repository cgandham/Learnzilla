// Import statement
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



class EvaluateStudFinalGrade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      studentid: '',
      grade: 0,
      studentList: [],
      studentLoaded: false,
      courseLoaded: false
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  componentDidMount() {
    let url = "/students";
    this.getStudentList(url);
    console.log(this.state.studentList);
  }

  // Get student list
  getStudentList(url)  {
    fetch(url, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            studentLoaded: true,
            studentList: result
          });

        },
        (error) => {
          this.setState({
            error
        });
      }
    )
  }

  // update student final grade
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

    this.updateStudent(studentid, grade);
    //alert("Course is assigned successfully! Redirect to SuccessPage");
    this.props.history.push('/dashboard');
  }

  // Render evaluate student final grade form
  render(){
      //console.log(this.state.studentList)
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
                {this.state.studentList.map((t, index) => <option key={index} value={t.id} >{t.id}</option>)}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="grade">
              <FormLabel>Student Grade</FormLabel>
              <FormControl type="Number" value={this.state.value} placeholder="Enter Student Grade" onChange={this.handleInput} />
            </FormGroup>

            <FormGroup>
              <Button type="submit">Evaluate Student Final Grade</Button>
            </FormGroup>
          </Form>
          </div>
        )
      }
  }
}


export default EvaluateStudFinalGrade;
