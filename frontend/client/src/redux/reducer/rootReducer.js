import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import groupReducer from './groupReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  group: groupReducer,
});

export default rootReducer;
