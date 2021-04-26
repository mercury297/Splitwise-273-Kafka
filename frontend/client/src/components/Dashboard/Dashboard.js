/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import DashboardNav from './DashboardNav';
import Duelist from './DueList';
import { getTotalBalance, createArrayForDueList, getArrForSelect } from '../../utils/dashboardUtils';
import { getCurrentUserData, getConfig } from '../../utils/commonUtils';
import SideNavbar from '../Navbar';
import API from '../../config';
import { getDashboard } from '../../redux/actions/dashboardAction';
// import { getTotalBalance } from '../../utils/dashboardUtils';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navData: {
        total: 0,
        owes: 0,
        owed: 0,
      },
      data: {
        owesList: [],
        owedList: [],
        owesTotalsList: [],
        owedTotalsList: [],
        owes: [],
        owed: [],
      },
      dataEval: false,
    };
  }

  async componentDidMount() {
    const currentUser = getCurrentUserData();
    const config = getConfig();
    console.log(currentUser);
    this.props.getDashboard(currentUser.email);
    try {
      const res = await axios.get(`${API.host}/dashboard/${currentUser.email}`, config);
      console.log('res', res.data);
      const totalsObject = getTotalBalance(res.data);
      console.log(totalsObject);
      const navData = { ...this.state.navData };
      navData.total = totalsObject.total;
      navData.owes = totalsObject.owes;
      navData.owed = totalsObject.owed;
      const dueListObject = { owed: [], owes: [] };
      const totalsDueObject = { owed: [], owes: [] };
      const owed = res.data.transactionSummaryWhereUserPaid;
      const owes = res.data.transactionSummaryWhereUserOwes;
      if (owes.length > 0) {
        const arrayRes = createArrayForDueList(owes, false);
        // console.log('array res:', arrayRes);
        dueListObject.owes = arrayRes.dueList;
        totalsDueObject.owes = arrayRes.totals;
      }
      if (owed.length > 0) {
        const arrayRes = createArrayForDueList(owed, true);
        dueListObject.owed = arrayRes.dueList;
        totalsDueObject.owed = arrayRes.totals;
      }
      this.setState({ navData });
      const data = { ...this.state.data };
      data.owesList = Object.keys(dueListObject.owes);
      data.owedList = Object.keys(dueListObject.owed);
      data.owes = dueListObject.owes;
      data.owed = dueListObject.owed;
      data.owesTotalsList = totalsDueObject.owes;
      data.owedTotalsList = totalsDueObject.owed;
      this.setState({ data });
      this.setState({ dataEval: true });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log('user list', this.state.data.owesList, this.state.data.owesList);
    let redirectVar = null;
    const userLS = localStorage.getItem('user');
    console.log('data', this.state.data);
    if (userLS === null) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        <SideNavbar />
        <DashboardNav
          totals={this.state.navData}
          userList={getArrForSelect(_.union(this.state.data.owesList, this.state.data.owedList))}
        />
        <Duelist data={this.state.data} fresh={this.state.dataEval} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard.dashboardData,
});

const mapDispatchToProps = (dispatch) => ({
  getDashboard: (payload) => dispatch(getDashboard(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
