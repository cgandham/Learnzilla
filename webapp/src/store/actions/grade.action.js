import * as ActionTypes from './action-types';

// export const GET_COURSE_DEATILS;
export const getCoursesDetails = (id) => dispatch => {

  let coursesGrades_URL = '/courses';
  fetch(coursesGrades_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((responseJson) => {
     dispatch({ type: ActionTypes.GET_COURSE_DETAILS, 
      payload: responseJson})
  })
  .catch(err =>
    dispatch({
      type: ActionTypes.ERRORS,
      payload: err.responseJson
    })
  );
};

export const getCoursesGrades = (studentId) => dispatch => {

    let coursesGrades_URL = `/students/${studentId}/courses`;
    fetch(coursesGrades_URL, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then((responseJson) => {
      let allCourses = []
       responseJson.courses.map( (c) => {
        fetch('/courses/' +c, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then((r) => {
           allCourses.push(r);
           dispatch({ type: ActionTypes.GET_COURSE_GRADES, payload: allCourses})
        })
        // .then(()=> {
        //   return allCourses;
        // })

       })
     
    })
    // .then((res) => {
    //   dispatch({ type: ActionTypes.GET_COURSE_GRADES, payload: res})
   
    // })
    .catch(err =>
      dispatch({
        type: ActionTypes.ERRORS,
        payload: err.responseJson
      })
    );


  };
  
  export const getCourse = (id) => {

    let coursesGrades_URL = '/courses' +id;
    fetch(coursesGrades_URL, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then((responseJson) => {
      return responseJson;
    })
   
  };


export const getCourseAssigns = (assignID) => dispatch => {

    let coursesGrades_URL = '/assignments/' + assignID;
    fetch(coursesGrades_URL, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then((responseJson) => {
      dispatch({ type: ActionTypes.GET_COURSE_ASSIGN_GRADES, payload: responseJson})
    })
    .catch(err =>
      dispatch({
        type: ActionTypes.ERRORS,
        payload: err.rresponseJson
      })
    );
  };
  