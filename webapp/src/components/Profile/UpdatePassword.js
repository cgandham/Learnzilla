import React, { Component } from 'react';
import { updateUser } from '../../store/actions/user.action';
import { connect } from 'react-redux';

class UpdatePassword extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
      }

    //validating and updating password
    submitForm(e){
        e.preventDefault();
        let pwd1 = document.getElementById('pwd1').value;
        let pwd2 = document.getElementById('pwd2').value;
        if(pwd1 != pwd2)
          alert("Passwords dont match");
        else {
            let data = {};
            data.password = pwd1;
            let id = JSON.parse(localStorage.getItem("user")).id;
            this.props.updateUser(id,data);

        }
        
    }

    
    //rendering password form
    render() {
        return(
            <>
           <div className="tab-pane fade updatePassword" id="profile">
            <br />
			<form id="tab2" onSubmit={this.submitForm}>
				<label>New Password</label> <br />
				<input id="pwd1" onChange={this.handleInput} type="password" className="input-xlarge" /><br />
                <label>Confirm Password</label> <br />
				<input id="pwd2" onChange={this.handleInput} type="password" className="input-xlarge" /><br />
                <br />
				<div>
                <button className="btn btn-lg btn-success pull-right" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Update</button>
				</div><br />
			</form>
		  </div>
            </>
            


        );
      
    }
}

const reduxProps = state => {
    return ({
      
    })
  };
  
  export default connect(reduxProps, { updateUser })(UpdatePassword);
