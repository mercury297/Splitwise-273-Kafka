import axios from 'axios';
import { getConfig } from '../../utils/commonUtils';
import { GETDASHBOARD } from './action_types';
import API from '../../config';

const dashboardDispatcher = (payload) => ({
  type: GETDASHBOARD, payload,
});

// payload = email
const getDashboard = (payload) => (dispatch) => {
  const config = getConfig();
  axios.get(`${API.host}/dashboard/${payload}`, config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(dashboardDispatcher(res.data));
      }
    });
};

export {
  getDashboard, dashboardDispatcher,
};
