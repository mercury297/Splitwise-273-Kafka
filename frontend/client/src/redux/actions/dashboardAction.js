import axios from 'axios';
import { getConfig } from '../../utils/commonUtils';
import { getTotalBalance, createArrayForDueList } from '../../utils/dashboardUtils';
import { GETDASHBOARD } from './action_types';
import API from '../../config';

const dashboardDispatcher = (payload) => ({
  type: GETDASHBOARD, payload,
});

// payload = email
const getDashboard = (payload) => (dispatch) => {
  const config = getConfig();
  axios.get(`${API.host}/dashboard/${payload}`, config)
    .then((res) => {
      if (res.status === 200) {
        const totalsObject = getTotalBalance(res.data);
        console.log(totalsObject);
        const navData = { };
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
        const data = { };
        data.owesList = Object.keys(dueListObject.owes);
        data.owedList = Object.keys(dueListObject.owed);
        data.owes = dueListObject.owes;
        data.owed = dueListObject.owed;
        data.owesTotalsList = totalsDueObject.owes;
        data.owedTotalsList = totalsDueObject.owed;
        const stateData = {
          navData,
          data,
          dataEval: true,
        };
        dispatch(dashboardDispatcher(stateData));
      }
    });
};

export {
  getDashboard, dashboardDispatcher,
};
