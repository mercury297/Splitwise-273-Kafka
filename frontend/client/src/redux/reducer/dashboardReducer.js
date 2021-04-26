import {
  GETDASHBOARD,
} from '../actions/action_types';

const initState = {
  dashboardData: {},
};

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case GETDASHBOARD: {
      return {
        dashboardData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
