import axios from 'axios';
import API from '../../config';
import { getConfig } from '../../utils/commonUtils';
import {
  REGISTEREDUSERS, GETEXPENSES,
} from './action_types';

const usersDispatcher = (payload) => ({
  type: REGISTEREDUSERS, payload,
});

const expenseDispatcher = (payload) => ({
  type: GETEXPENSES, payload,
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

// payload = groupName
const getExpenses = (payload) => (dispatch) => {
  const config = getConfig();
  axios.get(`${API.host}/group-management/group/${payload}/expenses`, config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(expenseDispatcher(res.data));
      }
    });
};

// payload = groupName, expenseID, email, name, note
const addNote = (payload) => (dispatch) => {
  console.log('inside addNote action');
  const config = getConfig();
  const {
    groupName, expenseID, email, name, note,
  } = payload;
  const reqBody = { email, name, note };
  axios.post(`${API.host}/group-management/group/${groupName}/expense/${expenseID}/note`, reqBody, config)
    .then((res) => {
      if (res.status === 201) {
        dispatch(expenseDispatcher(res.data));
      }
    });
};

const deleteNote = (payload) => (dispatch) => {
  const config = getConfig();
  const {
    groupName, expenseID, email, name, noteID,
  } = payload;
  const reqBody = { email, name };
  axios.delete(`${API.host}/group-management/group/${groupName}/expense/${expenseID}/note/${noteID}`, config, reqBody)
    .then((res) => {
      if (res.status === 200) {
        alert('Note deleted ');
        dispatch(expenseDispatcher(res.data));
      } else {
        alert('Problem in deleting note');
      }
    });
};

const addExpense = (payload) => (dispatch) => {
  const config = getConfig();
  const {
    groupName,
    description, amount,
    email, name,
  } = payload;
  const reqBody = {
    description,
    amount,
    paidEmail: email,
    paidName: name,
  };
  axios.post(`${API.host}/group-management/group/${groupName}/expense`, reqBody, config)
    .then((res) => {
      if (res.status === 200) {
        alert('Expense added successfully');
        dispatch(expenseDispatcher(res.data));
      }
    });
};

export {
  usersDispatcher, getRegisteredUsers, getExpenses, expenseDispatcher, addNote,
  deleteNote, addExpense,
};
