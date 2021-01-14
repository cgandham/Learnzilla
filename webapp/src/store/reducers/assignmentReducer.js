import assignmentState from '../state';
import {CREATE_ASSIGNMENT} from '../actions/action-types';

const initialState = assignmentState;

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASSIGNMENT:
      //console.log(action.payload);
      return {
        ...state,
        assignments: action.payload
      };

    default:
      return state;
  }
}
