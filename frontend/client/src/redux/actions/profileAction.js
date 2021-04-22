import axios from 'axios';
import { UPDATEPROFILE, SETPROFILE } from './action_types';
import API from '../../config';

const profileUpdateDispatcher = (payload) => ({
  type: UPDATEPROFILE, payload,
});

const setProfileDispatcher = (payload) => ({
  type: SETPROFILE, payload,
});

const profileUpdate = (payload) => (dispatch) => {
  console.log('PL for prof update action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.put(`${API.host}/profile/${payload.email}/update`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        alert('Profile updated successfuly!');
        dispatch(profileUpdateDispatcher(res.data));
      }
    })
    .catch((errors) => {
      alert(errors);
    });
};

const setProfile = (payload) => (dispatch) => {
  console.log('PL for prof set action: ', payload);
  dispatch(setProfileDispatcher(payload));
};

export {
  profileUpdateDispatcher, profileUpdate, setProfileDispatcher, setProfile,
};
