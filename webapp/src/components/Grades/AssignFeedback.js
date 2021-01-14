import React, { Component } from 'react';
import NavBar from '../NavBar';

class AssignFeedback extends Component {
    
    //rendering feedback modal.
    render() {
       //received feedback data from parent
        let feedback = this.props.feedback;
        return(
            <>
            <div className="modal fade" id="feedbackModal">
    <div className="modal-dialog modal-dialog-centered modal-xl">
      <div className="modal-content">

        <div className="modal-header">
          <h4 className="modal-title">FeedBack</h4>
        </div>
        
        <div className="modal-body">
          {feedback}
        </div>
         
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
            </>
            


        );
      
    }
}

export default AssignFeedback