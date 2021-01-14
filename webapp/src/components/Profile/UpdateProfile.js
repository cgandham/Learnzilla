import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateUser } from '../../store/actions/user.action';


class Profile extends Component {

	constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
      }

    //updating profile details
    submitForm(e){
		e.preventDefault();
		let name = document.getElementById('username').value;
		let email = document.getElementById('email').value;
		let address = document.getElementById('address').value;
		let data = {};
		data.name = name;
		data.email = email;
		data.address = address;
		let id = JSON.parse(localStorage.getItem("user")).id;
		//calling API to update
		this.props.updateUser(id, data);
		window.location = ('/dashboard');
        
    }

    render() {
		let p = JSON.parse(localStorage.getItem("user"));
        return(
            <>
			<br />

		<div className="tab-pane active in updateProfile" id="home">
			<form id="tab" onSubmit={this.submitForm} >
				<label>Username</label> <br />
				<input id="username" type="text" placeholder={p.name} className="input-xlarge" /> <br />
				<label>Email</label><br />
				<input id="email" type="text" placeholder={p.email} className="input-xlarge" /> <br />
				<label>Address</label><br />
				<textarea id="address" type="text" placeholder={p.address} rows="7" className="input-xlarge"></textarea> <br />
				<br />
				<br />
				<div>
				<button className="btn btn-lg btn-success pull-right" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Update</button>
				</div>
			</form>
		</div>
            
            </>
            


        );
      
    }
}


//export default Profile;
const reduxProps = state => {
	return ({
	  
	})
  };
  
  
export default connect(reduxProps, { updateUser })(Profile);