import { LOGIN, UNAUTHENTICATED, REGISTER } from '../actions/action_types';

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
    case REGISTER: {
      // add token for local storage. Do that in the backend
      console.log('inside register reducer', action.payload);
      // localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        authUser: true,
        currentUser: action.payload.data,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
