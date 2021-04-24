/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/order */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import Jumbotron from 'react-bootstrap/Jumbotron';
import React, { Component } from 'react';
import '../App.css';
import '../styles/recentActivity.css';
import SideNavbar from './Navbar';
import TablePage from './ActivityTable';
import { getActivity } from '../redux/actions/activityAction';
import { connect } from 'react-redux';

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: {},
      groupName: [],
      displayActivitie: [],
      data: {},
    };
  }

  componentDidMount = async () => {
    this.props.getActivity();
  }

  render() {
    console.log('props', this.props.activities);
    return (
      <div>
        <SideNavbar />
        <Jumbotron className="justify-content-md-center Title">
          <h3>Recent Acitivity </h3>
        </Jumbotron>
        <TablePage data={this.props.activities} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activities: state.activity.activities,
});

const mapDispatchToProps = (dispatch) => ({
  getActivity: () => dispatch(getActivity()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentActivity);
