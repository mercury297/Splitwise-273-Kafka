import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import groupReducer from './groupReducer';
import myGroupReducer from './myGroupReducer';
import activityReducer from './activityReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  group: groupReducer,
  myGroup: myGroupReducer,
  activity: activityReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
