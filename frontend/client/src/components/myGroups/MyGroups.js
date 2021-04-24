/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import axios from 'axios';
import React, { Component } from 'react';
import '../../App.css';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { getCurrentUserData, getConfig } from '../../utils/commonUtils';
import SideNavbar from '../Navbar';
import MyGroupsTable from './MyGroupsTable';
import '../../styles/myGroups.css';
import InvitationsTable from './InvitationsTable';
import API from '../../config';
import { getInvites, getMyGroups } from '../../redux/actions/myGroupAction';

class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myGroups: [],
      invites: [],
    };
  }

  componentDidMount = async () => {
    this.props.getInvites();
    this.props.getMyGroups();
    const currentUser = getCurrentUserData();
    const config = getConfig();
    const inviteRes = await axios.get(`${API.host}/group-management/groups/${currentUser.email}/invites`, config);
    if (inviteRes.status === 200) {
      this.setState({ invites: inviteRes.data });
    }
    const myGroupRes = await axios.get(`${API.host}/group-management/groups/${currentUser.email}`, config);
    if (inviteRes.status === 200) {
      this.setState({ myGroups: myGroupRes.data });
    }
  }

  render() {
    console.log('is this even working');
    console.log(this.props.myGroups);
    console.log(this.props.invites);
    const noGroup = <span style={{ marginLeft: '200px' }}> Not part of any group yet </span>;
    const noInvite = <span style={{ marginLeft: '200px' }}> No Invitations pending! </span>;
    return (
      <div>
        <SideNavbar />
        <div>
          <Container className="justify-content-md-center-lower lowerrectangle">
            <MyGroupsTable myGroups={this.state.myGroups} />
          </Container>
        </div>
        <br />
        <br />
        <div>
          <Container className="justify-content-md-center-lower lowerrectangle">
            <InvitationsTable myInvites={this.state.invites} />
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  myGroups: state.myGroup.myGroups,
  invites: state.myGroup.myInvites,
});

const mapDispatchToProps = (dispatch) => ({
  getInvites: () => dispatch(getInvites()),
  getMyGroups: () => dispatch(getMyGroups()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGroups);
