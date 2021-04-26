/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getCurrentUserData, getConfig } from '../../utils/commonUtils';
import API from '../../config';

class MyGroupsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectGroup: {},
      redirect: false,
    };
  }

    handleClick = async (groupName) => {
      const currentUser = getCurrentUserData();
      const reqBody = { email: currentUser.email };
      const config = getConfig();
      try {
        const leaveGroupRes = await axios.post(`${API.host}/group-management/groups/${groupName}/leave`, reqBody, config);
        console.log('leave res', leaveGroupRes);
        if (leaveGroupRes.status === 200) {
          alert(`Group ${groupName} left successfully`);
        } else {
          alert('Please clear dues for this group');
        }
      } catch (err) {
        console.log(err);
        alert('Please clear dues for this group');
      }
    }

    handleGroupRedirect = (group) => {
      const redirectGroup = { groupName: group.groupName };
      console.log(redirectGroup);
      this.setState({ redirectGroup });
      this.setState({ redirect: true });
    }

    render() {
      if (this.state.redirect) {
        return (
          <Redirect
            to={{
              pathname: `/group/${this.state.redirectGroup.groupName}`,
              state: { group: this.state.redirectGroup },
            }}
          />
        );
      }
      return (
        <table className="table">
          <tbody>
            {this.props.myGroups.map((group) => (
              <tr className="table">
                <td>
                  <button type="button" className="btn btn-primary" style={{ backgroundColor: 'whitesmoke', color: 'black' }} onClick={() => this.handleGroupRedirect(group)}>
                    {group.groupName}
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-primary" style={{ backgroundColor: '#ff652f' }} onClick={() => this.handleClick(group.groupName)}> Leave Group </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      );
    }
}

export default MyGroupsTable;
