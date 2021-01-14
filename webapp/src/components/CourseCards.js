import React, { Component } from 'react'
import './../styles/Modules/CourseCards.scss'

class CourseCards extends Component {

    // constructor(props){
    //     super(props);
    // }

    render() {
        const course = this.props.course;
    // console.log(this.props.course.title);

        return (
            <>
              <div className="col-xs-3">
            <div onClick={this.handleClick} className="project project-info">
            <div className="shape">
                <div className="shape-text"></div>
              </div>
              <div className="project-content">
                <h3 className="lead">

               
                 
                </h3>
                {/* <p>
                  {c.coursename}
                </p> */}
              </div>
            </div>
          </div>
          <div className={`col${course.id} card`} onClick={this.props.openCourseDetails.bind(this, course)}> {course.title}</div>
            </>
            
               

        )
    }
}

export default CourseCards
