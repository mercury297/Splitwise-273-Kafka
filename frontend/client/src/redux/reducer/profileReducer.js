import { UPDATEPROFILE, SETPROFILE } from '../actions/action_types';

const initState = {
  user: {},
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATEPROFILE: {
      console.log('action PL inside profi reducer: ', action.payload);
      return {
        user: action.payload,
      };
    }
    case SETPROFILE: {
      // const currentUser = localStorage.getItem('user');
      // console.log('inside prof reducer curr user from LS: ', JSON.parse(currentUser));
      // localStorage.removeItem('user');
      console.log('action PL inside set profile: ', action.payload);
      return {
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default profileReducer;
