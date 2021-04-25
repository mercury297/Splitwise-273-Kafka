import {
  REGISTEREDUSERS, GETEXPENSES,
} from '../actions/action_types';

const initState = {
  registeredUsers: [],
  expenses: [],
};

const groupReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTEREDUSERS: {
      console.log('action PL for reg users group reducer: ', action.payload);
      return {
        registeredUsers: action.payload,
      };
    }
    case GETEXPENSES: {
      console.log('action PL for get expense group reducer: ', action.payload);
      return Object.assign(state, {
        expenses: action.payload,
      });
    }
    default:
      return state;
  }
};

export default groupReducer;
