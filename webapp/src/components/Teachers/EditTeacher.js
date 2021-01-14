// Import statements
import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, FormLabel,} from 'react-bootstrap';
import { removeError } from '../../store/actions/error.action';
import NavBar from '../NavBar';
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from '../SideBar/SideBar';
import './EditTeacher.scss';

class EditTeacher extends Component {

  // constructor
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      teacherid: '',
      courseid: '',
      salary: 0,
      teacherList: [],
      courseList: [],
      courseLoaded: false,
      teacherLoaded: false
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  // Fetch all courses
  loadCourses() {
    fetch("/courses", {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            courseLoaded: true,
            courseList: result
          });
        },
        (error) => {
          this.setState({
            courseLoaded: false,
            error
        });
      }
    )
    //console.log(this.state.courseList);
  }

  // fetch all teachers
  loadTeachers() {
    fetch("/teachers", {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            teacherLoaded: true,
            teacherList: result
          });
        //  console.log(this.state.teacherList);
        },
        (error) => {
          this.setState({
            teacherLoaded: false,
            error
        });
      }
    )
  }

  // Assign teacher with course
  updateTeacher(teacherid, courseid, salary) {
    let editUrl = "/teachers/" + teacherid;
    fetch(editUrl, {
      method: 'PUT',
      body: JSON.stringify({
          "course": courseid,
          "salary": salary
        }
      ),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then((responseJson) => {
  //    alert("here")
      console.log(responseJson);
    });
  }

  componentDidMount() {
    this.loadTeachers();
    this.loadCourses();
  }

  handleInput(e) {
    let id = e.target.id;
    let val = e.target.value;
    //console.log(id);
    //console.log(val);
    this.setState({
      [id]: val
    });

  }

  submitForm(e){
    e.preventDefault();
    let teacherid = this.state.teacherid;
    let courseid = this.state.courseid;
    let salary = this.state.salary;
    this.updateTeacher(teacherid, courseid, salary);
    alert("Course is assigned successfully! Redirect to Dashboard");
    this.props.history.push('/dashboard');
  }

  // render course teacher assignment form
  render(){
      //console.log(this.state.courseList);
      if (this.state.error) {
        return <div>Error: {this.state.error.message}</div>;
      } else if (!this.state.courseLoaded) {
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
            <FormGroup controlId="teacherid">
              <FormLabel>Teacher Name</FormLabel>
              <FormControl as="select" value={this.state.value} onChange={this.handleInput}>
                <option>Select Teacher</option>
                {this.state.teacherList.map((t, index) => <option key={index} value={t.id} >{t.id}</option>)}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="courseid">
              <FormLabel>Course Name</FormLabel>
              <FormControl as="select" value={this.state.value} onChange={this.handleInput}>
                <option>Select Course</option>
                {this.state.courseList.map((c, index) => <option key={index} value={c.id} >{c.coursename}</option>)}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="salary">
              <FormLabel>Salary</FormLabel>
              <FormControl type="Number" value={this.state.value} placeholder="Enter Salary" onChange={this.handleInput} />
            </FormGroup>

            <FormGroup>
              <Button type="submit">Assign Course</Button>
            </FormGroup>
          </Form>
        </div>
        )
      }
  }
}


export default EditTeacher;
