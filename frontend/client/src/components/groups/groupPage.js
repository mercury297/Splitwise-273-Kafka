/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import SideNavbar from '../Navbar';
import Table from './groupTable';
import '../../styles/groupPage.css';
import ExpenseModal from './groupModal';
import API from '../../config';
import { getConfig } from '../../utils/commonUtils';

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
    //   usersummary: [],
    };
  }

  componentDidMount = async () => {
    const config = getConfig();
    // eslint-disable-next-line react/destructuring-assignment
    const { groupName } = this.props.location.state.group;
    const getExpenseRes = await axios.get(`${API.host}/group-management/group/${groupName}/expenses`, config);
    console.log(getExpenseRes);
    this.setState({ expenses: getExpenseRes.data });
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.props.location.state);
    // name={this.props.location.state.name});
    return (
      <div>
        <SideNavbar />
        {/* <Example GroupId={this.props.location.state.group}/>
        <TablePage data={this.state.expenses}/>
        <Usersummary data={this.state.usersummary}/> */}
        <ExpenseModal groupName={this.props.location.state.group.groupName} />
        <Table expenses={this.state.expenses} />
      </div>
    );
  }
}

export default GroupPage;
