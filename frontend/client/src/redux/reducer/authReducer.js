import {
  LOGIN, LOGOUT, UNAUTHENTICATED, REGISTER,
} from '../actions/action_types';

const initState = {
  authUser: false,
  tempUser: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN: {
      console.log('action payload inside auth reducer: ', action.payload);
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        authUser: true,
        tempUser: action.payload,
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
      localStorage.setItem('token', JSON.stringify(action.payload.data.token));
      localStorage.setItem('user', JSON.stringify(action.payload.data));
      return {
        authUser: true,
        tempUser: action.payload.data,
      };
    }
    case LOGOUT: {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        authUser: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
