import allGradesState from '../state/allGrades';
import {GET_COURSE_GRADES} from '../actions/action-types';
import {GET_COURSE_ASSIGN_GRADES, GET_COURSE_DETAILS} from '../actions/action-types';
import {ACTIONS} from '../actions/action-types';

const initialState = allGradesState;

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COURSE_GRADES:
      return {
        ...state,
        coursesGrades: [...state.coursesGrades, action.payload]
      };
    case GET_COURSE_ASSIGN_GRADES:
      return { 
        ...state,
        CourseAssigns: [...state.CourseAssigns, action.payload]
      };
    case GET_COURSE_DETAILS:
      return { 
        ...state,
        courses: action.payload
      }

    default:
      return state;
  }
}
