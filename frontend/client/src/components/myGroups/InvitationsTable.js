/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
// import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getCurrentUserData, getConfig } from '../../utils/commonUtils';
import { updateGroupsAndInvites } from '../../redux/actions/myGroupAction';

class InvitationsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    handleClick = async (groupName) => {
      const payload = { groupName };
      console.log(payload);
      this.props.updateGroupsAndInvites(payload);
    }

    render() {
      return (
        <table className="table">
          <tbody>
            {this.props.myInvites.map((invite) => (
              <tr className="table">
                <td>
                  {invite.groupName}
                </td>
                <td>
                  <button type="button" className="btn btn-primary" style={{ backgroundColor: '#ff652f' }} onClick={() => this.handleClick(invite.groupName)}> Accept Invite </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  updateGroupsAndInvites: (payload) => dispatch(updateGroupsAndInvites(payload)),
});

export default connect(null, mapDispatchToProps)(InvitationsTable);
