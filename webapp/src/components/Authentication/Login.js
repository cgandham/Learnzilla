// Import Statements
import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, FormLabel,} from 'react-bootstrap';
// import './Authentication.scss';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/user.action';
import { removeError } from '../../store/actions/error.action';

class Login extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      role: ''
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.createSession = this.createSession.bind(this);
  }

  componentWillReceiveProps (newProps) {
    //console.log(newProps)
    //alert(Object.keys(newProps.auth));
    if (newProps.errorMesage == undefined) {
        this.props.removeError()
    }
    if (Object.keys(newProps.auth).length > 0 ) {
      this.createSession(newProps.auth.user);
      this.props.history.push('/dashboard');
    }
  }

  // Save user in localstorage
  createSession(userDetails) {
    //first time add
    if (localStorage.getItem("user") === null) {
      localStorage.setItem("user", JSON.stringify(userDetails));
    }



      // if (localStorage.getItem("user") === null) {
      //     localStorage.setItem("user", JSON.stringify(userDetails));
      //   }
      // if (localStorage.getItem("roleid") === null) {
      //   localStorage.setItem("roleid", JSON.stringify(roleID));
      // }
  }

  handleInput(e) {
    let name = e.target.id
    let val = e.target.value
    this.setState({[name]: val})
  }

  submitForm(e){
    e.preventDefault();
    this.props.loginUser(this.state);
  }

  // Render Login Form
  render(){
    return(

      <>

{/* <Form onSubmit={this.submitForm}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl type="text" value={this.state.value} placeholder="Enter email" onChange={this.handleInput} />
        </FormGroup>

        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl type="password" value={this.state.value} placeholder="Enter password" onChange={this.handleInput} />
        </FormGroup>

        <FormGroup controlId="role">
          <FormLabel>Role</FormLabel>
          <FormControl as="select" value={this.state.value} onChange={this.handleInput}>
            <option>Enter Role</option>
            <option>Teacher</option>
            <option>Student</option>
            <option>Admin</option>
          </FormControl>
        </FormGroup>

        <FormGroup>
          <Button type="submit">Login</Button>
        </FormGroup>
      </Form>
      */}
        <div className="container register">
          <div className="row">
            <div className="col-md-3 register-left">
              {/* <span className="glyphicon glyphicon-education"></span> */}
              <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
              <h3>Welcome</h3>
              <p>You are 30 seconds away from learning!</p>
            </div>
            <div className="col-md-9 register-right">

              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                  <h3 className="register-heading">Login</h3>
                  <Form onSubmit={this.submitForm}>
                    <FormGroup controlId="email">
                      <FormLabel>Email</FormLabel>
                      <FormControl type="text" value={this.state.value} placeholder="Enter email" onChange={this.handleInput} />
                    </FormGroup>

                    <FormGroup controlId="password">
                      <FormLabel>Password</FormLabel>
                      <FormControl type="password" value={this.state.value} placeholder="Enter password" onChange={this.handleInput} />
                    </FormGroup>

                    <FormGroup controlId="role">
                      <FormLabel>Role</FormLabel>
                      <FormControl as="select" value={this.state.value} onChange={this.handleInput}>
                        <option>Enter Role</option>
                        <option>Teacher</option>
                        <option>Student</option>
                        <option>Admin</option>
                      </FormControl>
                    </FormGroup>

                    <FormGroup>
                      <Button type="submit">Login</Button>
                    </FormGroup>
                  </Form>
                </div>

              </div>
            </div>
          </div>
        </div>

  </>



  )
  }
}

//export default Login;
const reduxProps = state => {
  return ({
    auth: state.user.authUser,
    errorMesage: state.errors.message
  })
};


export default connect(reduxProps, { loginUser, removeError })(Login);
