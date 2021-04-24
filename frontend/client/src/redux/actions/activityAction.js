import axios from 'axios';
import { getConfig, getCurrentUserData } from '../../utils/commonUtils';
import { getTableData, sortDataByID } from '../../utils/activityUtils';
import API from '../../config';
import {
  GETACTIVITIES,
} from './action_types';

const activityDispatcher = (payload) => ({
  type: GETACTIVITIES, payload,
});

const getActivity = () => (dispatch) => {
  const config = getConfig();
  const currentUser = getCurrentUserData();
  axios.get(`${API.host}/activities/${currentUser.email}`, config)
    .then((res) => {
      console.log('action res for activity:', res);
      let tableData = getTableData(res.data);
      tableData = sortDataByID(tableData);
      if (res.status === 200) {
        dispatch(activityDispatcher(tableData));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

export {
  activityDispatcher, getActivity,
};
