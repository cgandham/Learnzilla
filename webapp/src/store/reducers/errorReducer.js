import errorState from '../state';
import {ERRORS, REMOVE_ERRORS} from '../actions/action-types';

const initialState = errorState;

export default function(state = initialState, action) {
  switch (action.type) {
    case ERRORS:
      return {
        message: action.payload
      };

    case REMOVE_ERRORS:
      return {
        message: {}
      };

    default:
      return state;
  }
}
