import * as ActionTypes from './action-types';

export const createCourse = courseData => dispatch => {
  let createcourseUrl = '/courses';
  fetch(createcourseUrl, {
    method: 'POST',
    body: JSON.stringify({
      'coursename': courseData.coursename,
      'coursedesc': courseData.coursedesc,
      'coursestartdate': courseData.coursestartdate,
      'courseenddate': courseData.courseenddate
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((responseJson) => {
    if (responseJson.status >= 200 && responseJson.status < 300) {
      //console.log(responseJson.course)
      dispatch({ type: ActionTypes.CREATE_COURSE, payload: responseJson.course})
    } else {
      //alert(responseJson);
      dispatch({ type:ActionTypes.ERRORS, responseJson})
    }
  })
  .catch(err =>
    dispatch({
      type: ActionTypes.ERRORS,
      payload: err.response
    })
  );
};

// localhost:8080/students/5fd42d21feb2286945101366/courses

export const getMyCourses = (studentId) => dispatch => {
  let Url = `/students/${studentId}/courses`;
  fetch(Url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((responseJson) => {
      console.log(responseJson.courses)
      dispatch({ type: ActionTypes.GET_MY_COURSES, payload: responseJson.courses})
      // alert(responseJson.courses);
      // dispatch({ type:ActionTypes.ERRORS, responseJson})
    
  })
  .catch(err =>
    dispatch({
      type: ActionTypes.ERRORS,
      payload: err.response
    })
  );
};