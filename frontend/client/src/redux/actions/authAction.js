import axios from 'axios';
import { LOGIN, REGISTER, UNAUTHENTICATED } from './action_types';
import API from '../../config';

const loginDispatcher = (payload) => ({
  type: LOGIN, payload,
});

const registerDispatcher = (payload) => ({
  type: REGISTER, payload,
});

const unauthDispatcher = (payload) => ({
  type: UNAUTHENTICATED, payload,
});

const loginUser = (payload) => (dispatch) => {
  console.log('PL for login action: ', payload);
  axios.post(`${API.host}/user/login`, payload)
    .then((res) => {
      if (res.status === 201) {
        console.log(res);
        dispatch(loginDispatcher(res.data));
      }
      console.log('dispatch response :', res);
    })
    .catch((errors) => {
      console.log(errors);
      if (errors) {
        alert('Invalid username or password. Please try again');
        console.log('in catch', errors.response.data);
        dispatch(unauthDispatcher(errors.response.data));
      } else {
        dispatch(unauthDispatcher('Server error'));
      }
    });
};

const registerUser = (payload) => (dispatch) => {
  console.log(payload);
  axios.post(`${API.host}/user/register`, payload)
    .then((res) => {
      if (res.status === 201) {
        console.log(res);
        dispatch(registerDispatcher(res.data));
      }
    })
    .catch((errors) => {
      if (errors.response.data) {
        console.log('in catch', errors.response.data);
        alert('This email address is already registered! Please try another.');
        dispatch(unauthDispatcher(errors.response.data));
      } else {
        dispatch(unauthDispatcher('Server error'));
      }
    });
};

export {
  loginDispatcher, registerDispatcher, loginUser, registerUser,
};
