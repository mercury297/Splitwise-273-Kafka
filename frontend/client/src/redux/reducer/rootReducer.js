import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import groupReducer from './groupReducer';
import myGroupReducer from './myGroupReducer';
import activityReducer from './activityReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  group: groupReducer,
  myGroup: myGroupReducer,
  activity: activityReducer,
});

export default rootReducer;
