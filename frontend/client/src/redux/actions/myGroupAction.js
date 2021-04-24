import axios from 'axios';
import {
  GETINVITATIONS, GETMYGROUPS,
} from './action_types';
import API from '../../config';
import { getConfig, getCurrentUserData } from '../../utils/commonUtils';
import { divideGroupsArray } from '../../utils/groupUtils';

const invitationDispatcher = (payload) => ({
  type: GETINVITATIONS, payload,
});

const myGroupDispatcher = (payload) => ({
  type: GETMYGROUPS, payload,
});

const getInvites = () => (dispatch) => {
  const currentUser = getCurrentUserData();
  const config = getConfig();
  // console.log('PL for get invites action: ', payload);
  axios.get(`${API.host}/group-management/groups/${currentUser.email}/invites`, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        dispatch(invitationDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const getMyGroups = () => (dispatch) => {
  const currentUser = getCurrentUserData();
  const config = getConfig();
  axios.get(`${API.host}/group-management/groups/${currentUser.email}`, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        dispatch(myGroupDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

// res.data.user.groups
const updateGroupsAndInvites = (payload) => (dispatch) => {
  console.log(payload);
  const currentUser = getCurrentUserData();
  const config = getConfig();
  const reqBody = { email: currentUser.email, name: currentUser.name };
  axios.post(`http://localhost:3001/group-management/groups/${payload.groupName}/invitation/accept`, reqBody, config)
    .then((res) => {
      if (res.status === 200) {
        const updatedData = res.data.user.groups;
        const dividedObject = divideGroupsArray(updatedData);
        dispatch(myGroupDispatcher(dividedObject.myGroups));
        dispatch(invitationDispatcher(dividedObject.invites));
        alert(`Invite from ${payload.groupName} accepted successfully`);
      }
    })
    .catch((err) => {
      console.log(err);
      alert('Could not accept invite.');
    });
};

export {
  invitationDispatcher, myGroupDispatcher, getInvites, getMyGroups, updateGroupsAndInvites,
};
