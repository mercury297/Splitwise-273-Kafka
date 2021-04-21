import { LOGIN, UNAUTHENTICATED } from '../actions/action_types';

const initState = {
  authUser: false,
  currentUser: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN: {
      console.log('action payload inside auth reducer: ', action.payload);
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        authUser: true,
        currentUser: action.payload,
      };
    }
    case UNAUTHENTICATED: {
      console.log(action.payload);
      return {
        authUser: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
