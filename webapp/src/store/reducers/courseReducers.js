import courseState from '../state';
import {CREATE_COURSE, GET_MY_COURSES} from '../actions/action-types';

const initialState = courseState;

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_COURSE:
      console.log(action.payload);
      return {
        ...state,
        courses: action.payload
        //courses: [...state.courses, action.payload]
      };

    case GET_MY_COURSES:
      console.log(action.payload);
      return {
        ...state,
        courseState: action.payload
      }
    default:
      return state;
  }
}
