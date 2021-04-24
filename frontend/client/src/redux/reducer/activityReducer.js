import {
  GETACTIVITIES,
} from '../actions/action_types';

const initState = {
  activities: [],
};

const activityReducer = (state = initState, action) => {
  switch (action.type) {
    case GETACTIVITIES: {
      return {
        activities: action.payload,
      };
    }
    default:
      return state;
  }
};

export default activityReducer;
