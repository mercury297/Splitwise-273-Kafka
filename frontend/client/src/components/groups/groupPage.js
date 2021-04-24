/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// import axios from 'axios';
import SideNavbar from '../Navbar';
import Table from './groupTable';
import '../../styles/groupPage.css';
import ExpenseModal from './groupModal';

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   expenses: [],
    //   usersummary: [],
    };
  }

  componentDidMount = async () => {
    // console.log('group id', this.props.location.state.group);
    // const groupId = this.props.location.state.group;
    // console.log('group id', groupId);
    // const resForExpenseList = await axios.get(`http://localhost:3002/individualgroup/showexpanse/${groupId}`);
    // console.log('Expanse', resForExpenseList.data);
    // this.setState({ expenses: resForExpenseList.data.data });
    // const resForUserSummary = await axios.get(`http://localhost:3002/individualgroup/Groupsummary/${groupId}`);
    // console.log('summary', resForUserSummary.data);
    // this.setState({ usersummary: resForUserSummary.data.body });
  }

  render() {
    // name={this.props.location.state.name});
    return (
      <div>
        <SideNavbar />
        {/* <Example GroupId={this.props.location.state.group}/>
        <TablePage data={this.state.expenses}/>
        <Usersummary data={this.state.usersummary}/> */}
        <ExpenseModal />
        <Table />
      </div>
    );
  }
}

export default GroupPage;
