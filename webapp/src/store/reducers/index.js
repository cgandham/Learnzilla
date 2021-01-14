import { combineReducers } from 'redux';
import userReducer from './userReducer';
import courseReducers from './courseReducers';
import errorReducer from './errorReducer';
import gradeReducer from './gradeReducer';
import assignmentReducer from './assignmentReducer';

const rootReducer =  combineReducers({
  user: userReducer,
  course: courseReducers,
  assignment: assignmentReducer,
  errors: errorReducer,
  grades: gradeReducer
});

export default rootReducer;
