/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/order */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import Jumbotron from 'react-bootstrap/Jumbotron';
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import '../styles/recentActivity.css';
import SideNavbar from './Navbar';
import TablePage from './ActivityTable';
import { getConfig, getCurrentUserData } from '../utils/commonUtils';
import API from '../config';
import { getTableData, sortDataByID } from '../utils/activityUtils';

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
    const config = getConfig();
    console.log(config);
    const currentUser = getCurrentUserData();
    const resForGroupNames = await axios.get(`${API.host}/activities/${currentUser.email}`, config);
    console.log(resForGroupNames.data);
    let tableData = getTableData(resForGroupNames.data);
    tableData = sortDataByID(tableData);
    console.log(tableData);
    // getDataForRecentActivity(resForGroupNames.data.body);
    this.setState({ activities: tableData });
  }

  render() {
    console.log('state', this.state.activities);
    return (
      <div>
        <SideNavbar />
        <Jumbotron className="justify-content-md-center Title">
          <h3>Recent Acitivity </h3>
        </Jumbotron>
        <TablePage data={this.state.activities} />
      </div>
    );
  }
}

export default RecentActivity;
