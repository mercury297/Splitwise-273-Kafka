import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import groupReducer from './groupReducer';
import myGroupReducer from './myGroupReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  group: groupReducer,
  myGroup: myGroupReducer,
});

export default rootReducer;
