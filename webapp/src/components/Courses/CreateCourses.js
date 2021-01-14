// Import statements
import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, FormLabel,} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createCourse } from '../../store/actions/course.action';
import { removeError } from '../../store/actions/error.action';
import NavBar from '../NavBar';
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from '../SideBar/SideBar';
import './CreateCourses.scss';

class CreateCourses extends Component {

  // constructor
  constructor(props) {
    super(props);
    this.state = {
      coursename: '',
      coursedesc: '',
      coursestartdate: '',
      courseenddate: ''
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillReceiveProps (newProps) {
    console.log("newProps " + newProps)
    if (newProps.errorMesage == undefined) {
        this.props.removeError()
    } else {
      alert("Course is added successfully!");
      alert("Redirect to SuccessPage");
      this.props.history.push('/dashboard')
    }
    // if (Object.keys(newProps.auth).length > 0 ) {
    //   alert(newProps.auth);
    //   this.props.history.push('/dashboard')
    // }
  }

  handleInput(e) {
    let name = e.target.id
    let val = e.target.value
    this.setState({[name]: val})
  }

  submitForm(e){
    e.preventDefault();
    this.props.createCourse(this.state);
  }

  // Render form for createcourse
  render(){
    return(
      <div>
      <NavBar />
      <Navbar className="sidebar">
            <Navbar.Collapse>
              <Sidebar />
            </Navbar.Collapse>
      </Navbar>
      <Form className="formclass" onSubmit={this.submitForm}>
        <FormGroup controlId="coursename">
          <FormLabel>Course Name</FormLabel>
          <FormControl type="text" value={this.state.value} placeholder="Enter Course Name" onChange={this.handleInput} />
        </FormGroup>

        <FormGroup controlId="coursedesc">
          <FormLabel>Course Description</FormLabel>
          <FormControl type="text" value={this.state.value} placeholder="Enter Course Name" onChange={this.handleInput} />
        </FormGroup>

        <FormGroup controlId="coursestartdate">
          <FormLabel>Course Start Date</FormLabel>
          <FormControl type="date" value={this.state.value} placeholder="Enter Course Start Date" onChange={this.handleInput} />
        </FormGroup>

        <FormGroup controlId="courseenddate">
          <FormLabel>Course End Date</FormLabel>
          <FormControl type="date" value={this.state.value} placeholder="Enter Course End Date" onChange={this.handleInput} />
        </FormGroup>

        <FormGroup>
          <Button type="submit">Add Course</Button>
        </FormGroup>
      </Form>
      </div>
    )
  }
}

const reduxProps = state => {
  return ({
    courses: state.course.courses,
    errorMesage: state.errors.message
  })
};

export default connect(reduxProps, { createCourse, removeError })(CreateCourses);
