// Import statement
import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, FormLabel,} from 'react-bootstrap';
import { removeError } from '../../store/actions/error.action';
import { logoutUser } from '../../store/actions/user.action';
import NavBar from '../NavBar';
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from '../SideBar/SideBar';
// import './Authentication.scss';

const userreduxProps = state => {
  return ({
    auth: state.user.authUser
  })
};



class Deregister extends Component {

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
    this.deleteStudent = this.deleteStudent.bind(this);
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

  // Deregister student
  deleteStudent(studentid) {
    //alert(studentid);
    let editUrl = "/students/" + studentid;
    fetch(editUrl, {
      method: 'DELETE',
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
    this.deleteStudent(studentid);
    //alert("Course is assigned successfully! Redirect to SuccessPage");
    this.props.history.push('/dashboard');
  }

  // Render deregister form
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


            <FormGroup>
              <Button type="submit">Deregister Student</Button>
            </FormGroup>
          </Form>
          </div>
        )
      }
  }
}


export default Deregister;
