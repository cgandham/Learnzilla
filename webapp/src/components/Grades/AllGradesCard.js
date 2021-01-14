import React, { Component } from 'react';
import NavBar from '../NavBar';
import CourseAssignScores from './CourseAssignScores';

import { getCourseAssigns } from '../../store/actions/grade.action';
import { Link } from 'react-router-dom';
//import { Route, Switch, Redirect } from 'react-router';
 import { withRouter,useHistory } from 'react-router-dom';
 import { connect } from 'react-redux';

class AllGradesCard extends Component {


    constructor(props) {
      super(props);
  
      console.log(this.props)
      this.handleClick = this.handleClick.bind(this);
  }
  
  //navigate to CourseAssignScores component passing assignments as props
    handleClick(e){
      window.location.href = '/HW-scores';
      // this.props.history.push({
      //   pathname: 'HW-scores',
      //   state: { courseAssigns: this.props.course.assignment }
      // })
    }



      render() {
        //changing css classes according to score
          let c = this.props.course;
          console.log("c is "+c);
          console.log("props is "+this.props);
          let perClass = "c100 p25 ";
          let cardClass = "project ";
          if(c.coursefinalscore >= 90){
            perClass += "dark green";
            cardClass += "project-success";
          }
          else{
            perClass += "dark orange";
            cardClass += "project-warning";
          }
         
          //render each grade card
        return (
          <div className="col-xs-3">
            <div onClick={this.handleClick} className={cardClass}>
              <div className="shape">
                <div className="shape-text"></div>
              </div>
              <div className="project-content">
                <h3 className="lead">
                  <div className={perClass}>
                    <span>{c.coursefinalscore}</span>
                    <div className="slice">
                      <div className="bar"></div>
                      <div className="fill"></div>
                    </div>
                  </div>
                </h3>
                <p>
                  {c.coursename}
                </p>
              </div>
            </div>
          </div>
        //  </>
        );
      }

}

//fetching data from parent component itself

const reduxProps = state => {
  // return ({
  //     //grades: state.grades.coursesGrades
  // })
};


export default connect(reduxProps, { getCourseAssigns })(AllGradesCard);
