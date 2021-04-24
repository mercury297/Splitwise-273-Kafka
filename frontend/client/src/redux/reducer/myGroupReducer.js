import {
  GETINVITATIONS, GETMYGROUPS,
} from '../actions/action_types';

const initState = {
  myGroups: [],
  myInvites: [],
};

const myGroupReducer = (state = initState, action) => {
  switch (action.type) {
    case GETINVITATIONS: {
      console.log(state);
      return Object.assign(state, {
        myInvites: action.payload,
      });
    }
    case GETMYGROUPS: {
      console.log(state);
      return Object.assign(state, {
        myGroups: action.payload,
      });
    }
    default:
      return state;
  }
};

export default myGroupReducer;
