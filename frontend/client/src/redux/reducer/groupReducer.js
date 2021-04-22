import {
  REGISTEREDUSERS,
} from '../actions/action_types';

const initState = {
  registeredUsers: [],
};

const groupReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTEREDUSERS: {
      console.log('action PL for reg users group reducer: ', action.payload);
      return {
        registeredUsers: action.payload,
      };
    }
    default:
      return state;
  }
};

export default groupReducer;
