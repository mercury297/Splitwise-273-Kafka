/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import axios from 'axios';
import React, { Component } from 'react';
import '../../App.css';
import Container from 'react-bootstrap/Container';
import { getCurrentUserData, getConfig } from '../../utils/commonUtils';
import SideNavbar from '../Navbar';
import MyGroupsTable from './MyGroupsTable';
import '../../styles/myGroups.css';
import InvitationsTable from './InvitationsTable';
import API from '../../config';

class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myGroups: [],
      myInvites: [],
      noGroup: false,
      noInvites: false,
    };
  }

  componentDidMount = async () => {
    const currentUser = getCurrentUserData();
    const { email } = currentUser;
    // eslint-disable-next-line camelcase
    const config = getConfig();
    try {
      const getGroupsRes = await axios.get(`${API.host}/group-management/groups/${email}`, config);
      // console.log('invite res ', invitationsRes);
      console.log('get groups res', getGroupsRes);
      //   console.log(getGroupsRes.data.length);
      //   if (getGroupsRes.data.length > 0) {
      this.setState({ myGroups: getGroupsRes.data });
    //   } else {
    //     this.setState({ noGroup: true });
    //   }
    } catch (err) {
      // alert(err.response.data.myGroups);
      this.setState({ noGroup: true });
    }
    try {
      const invitationsRes = await axios.get(`${API.host}/group-management/groups/${email}/invites`, config);
      console.log(invitationsRes);
      //   if (invitationsRes.data.length > 0) {
      this.setState({ myInvites: invitationsRes.data });
    //   } else {
    //     this.setState({ noGroup: true });
    //   }
    //   this.setState({ myInvites: invitationsRes.data });
    } catch (err) {
      this.setState({ noInvites: true });
    }
  }

  render() {
    let noGroup = null;
    const noInvite = null;
    if (this.state.noGroup) {
      noGroup = <span> Not part of any group yet </span>;
    }
    if (this.state.noInvites) {
      noGroup = <span> Not Invitations also! </span>;
    }
    return (
      <div>
        <SideNavbar />
        {this.state.noGroup
          ? (
            <Container className="justify-content-md-center-lower lowerrectangle">
              {noGroup}
            </Container>
          ) : (
            <div>
              <Container className="justify-content-md-center-lower lowerrectangle">
                <MyGroupsTable myGroups={this.state.myGroups} />
              </Container>
            </div>
          )}
        <br />
        <br />
        {this.state.noInvites
          ? (
            <Container className="justify-content-md-center-lower lowerrectangle">
              {noInvite}
            </Container>
          ) : (
            <div>
              <Container className="justify-content-md-center-lower lowerrectangle">
                <InvitationsTable myInvites={this.state.myInvites} />
              </Container>
            </div>
          )}

      </div>
    );
  }
}

export default MyGroups;
