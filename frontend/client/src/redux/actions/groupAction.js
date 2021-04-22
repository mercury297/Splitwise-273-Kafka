import axios from 'axios';
import API from '../../config';
import { getConfig } from '../../utils/commonUtils';
import {
  REGISTEREDUSERS,
} from './action_types';

const usersDispatcher = (payload) => ({
  type: REGISTEREDUSERS, payload,
});

const getRegisteredUsers = () => (dispatch) => {
  console.log('PL for registered users action: ');
  const config = getConfig();
  axios.get(`${API.host}/user/registered`, config)
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        dispatch(usersDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log('get registered users action err: ', errors);
    });
};

export {
  usersDispatcher, getRegisteredUsers,
};
