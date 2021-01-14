// Import statement
import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, FormLabel,} from 'react-bootstrap';
import { removeError } from '../../store/actions/error.action';
import { logoutUser } from '../../store/actions/user.action';
import NavBar from '../NavBar';
import { Navbar,Nav, NavItem } from 'react-bootstrap' ;
import Sidebar from '../SideBar/SideBar';
//import './Authentication.scss';

const userreduxProps = state => {
  return ({
    auth: state.user.authUser
  })
};



class DeregisterTeacher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      teacherid: '',
      teacherList: [],
      teacherLoaded: false,
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteTeacher = this.deleteTeacher.bind(this);
  }

  componentDidMount() {
    let url = "/teachers";
    this.getTeacherList(url);
  }

  // Get teacher list
  getTeacherList(url)  {
    fetch(url, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            teacherLoaded: true,
            teacherList: result
          });

        },
        (error) => {
          this.setState({
            error
        });
      }
    )
  }

  // Deregister teacher
  deleteTeacher(teacherid) {
    //alert(teacherid);
    let editUrl = "/teachers/" + teacherid;
    fetch(editUrl, {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then((responseJson) => {

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

    let teacherid = this.state.teacherid;
    this.deleteTeacher(teacherid);
    this.props.history.push('/dashboard');
  }

  // Render deregister form
  render(){
      if (this.state.error) {
        return <div>Error: {this.state.error.message}</div>;
      } else if (!this.state.teacherLoaded) {
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
              <FormLabel>Teacher ID</FormLabel>
              <FormControl as="select" value={this.state.value} onChange={this.handleInput}>
                <option placeholder="Select Teacher" > Select Teacher </option>
                {this.state.teacherList.map((t, index) => <option key={index} value={t.id} >{t.id}</option>)}
              </FormControl>
            </FormGroup>


            <FormGroup>
              <Button type="submit">Deregister Teacher</Button>
            </FormGroup>
          </Form>
          </div>
        )
      }
  }
}


export default DeregisterTeacher;
