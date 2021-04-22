/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
import '../../App.css';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import '../../styles/createGroup.css';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import SideNavbar from '../Navbar';
import getArrayForSelect from '../../utils/groupUtils';

import { getRegisteredUsers } from '../../redux/actions/groupAction';
import { removeCurrentUser, getCurrentUserData, getConfig } from '../../utils/commonUtils';
import API from '../../config';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   userList: [],
      selectedUsers: [],
      addedPersons: [],
    };
  }

  handleAddPerson = (e, usersList) => {
    e.preventDefault();
    this.setState({
      addedPersons: [...this.state.addedPersons,
        <div className=" d-flex flex-row bd-highlight mb-3 fields ">
          <img className="rounded-circle profile-pic" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue23-50px.png" />
          <Select
            className="names"
            options={usersList}
            onChange={(opt) => this.handleSelect(opt)}
          />
        </div>,
      ],
    });
  }

  handleSelect = (opt) => {
    let newOpts = this.state.selectedUsers.concat({ email: opt.value });
    newOpts = _.uniqBy(newOpts, 'email');
    this.setState({ selectedUsers: newOpts });
  }

  componentDidMount = async () => {
    this.props.getRegisteredUsers();
    console.log(this.props.users);
  }

  handleSubmit = async (e) => {
    const curentUser = getCurrentUserData();
    const groupName = e.target.groupName.value;
    // getCurrentUserData();
    const selUsers = this.state.selectedUsers;
    console.log('selected ', selUsers);
    e.preventDefault();
    const reqForCreate = {
      groupName,
      email: curentUser.email,
      userName: curentUser.name,
    };
    const emailsForInvite = selUsers.map((user) => user.email);
    console.log(reqForCreate);
    try {
      const config = getConfig();
      const groupCreateRes = await axios.post(`${API.host}/group-management/create`, reqForCreate, config);
      console.log(groupCreateRes);
      if (groupCreateRes.status === 200) {
        const sendInvitesRes = await axios.post(`${API.host}/group-management/${groupName}/invitations/send`, { emails: emailsForInvite }, config);
        console.log(sendInvitesRes);
        if (sendInvitesRes.status === 200) {
          alert('Group created and members added successfully!');
        }
      }
    } catch (err) {
      console.log(err);
      alert('Error creating group! Please debug!');
    }
  }

  render() {
    if (this.props.users.length > 1) {
      console.log(this.props.users);
      const currUserFromLS = JSON.parse(localStorage.getItem('user'));
      console.log(currUserFromLS.email);
      let userList = removeCurrentUser(this.props.users, currUserFromLS);
      // console.log(userlist);
      userList = getArrayForSelect(userList);
      return (
        <div>
          <SideNavbar />
          <div className="content-block">
            <img className="envelope" src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" alt="No img" width="200" height="200" />

            <h2>Start a new group</h2>
            <form id="new_group" className="form" onSubmit={this.handleSubmit}>
              <div id="group_avatar_upload">
                <input type="file" id="group_avatar" />
              </div>
              <div className="Mygroupshallbe">
                My group shall be called…
              </div>
              <input tabIndex="1" placeholder="The Breakfast Club" autoComplete="off" type="text" id="group_name" name="groupName" />
              <hr />
              <h2>Group Memebers</h2>
              <div className=" d-flex flex-row bd-highlight mb-3 fields ">
                <img className="rounded-circle profile-pic" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue23-50px.png" />
                <Select
                  className="names"
                  options={userList}
                  onChange={(opt) => this.handleSelect(opt)}
                />
              </div>
              <div className=" d-flex flex-row bd-highlight mb-3 fields ">
                <img className="rounded-circle profile-pic" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue23-50px.png" />
                <Select
                  className="names"
                  options={userList}
                  onChange={(opt) => this.handleSelect(opt)}
                />
              </div>
              <div className=" d-flex flex-row bd-highlight mb-3 fields ">
                <img className="rounded-circle profile-pic" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue23-50px.png" />
                <Select
                  className="names"
                  options={userList}
                  onChange={(opt) => this.handleSelect(opt)}
                />
              </div>
              <div className=" d-flex flex-row bd-highlight mb-3 fields ">
                <img className="rounded-circle profile-pic" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue23-50px.png" />
                <Select
                  className="names"
                  options={userList}
                  onChange={(opt) => this.handleSelect(opt)}
                />
              </div>
              {this.state.addedPersons.forEach(() => (
                <div className=" d-flex flex-row bd-highlight mb-3 fields ">
                  <img className="rounded-circle profile-pic" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue23-50px.png" />
                  <Select
                    className="names"
                    options={userList}
                    onChange={(opt) => this.handleSelect(opt)}
                  />
                </div>
              ))}
              {this.state.addedPersons}
              <Button type="button" id="addPerson" onClick={(event) => this.handleAddPerson(event, userList)}> + Add a person </Button>
              <Button
                type="submit"
                style={{ backgroundColor: '#ff652f', marginLeft: '10px' }}
                className="btn btn-secondary btn-lg"
              >
                SAVE
              </Button>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        <SideNavbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.group.registeredUsers,
//   currentUser: state.profile.user,
});

const mapDispatchToProps = (dispatch) => ({
  getRegisteredUsers: () => dispatch(getRegisteredUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
