/* eslint-disable no-underscore-dangle */
import { currencyFormatter, getCurrentUserData } from './commonUtils';

const getTotal = (untotalledArray) => {
  const total = untotalledArray.reduce((acc, elem) => acc + elem.total, 0);
  return total;
};

const getTotalBalance = (data) => {
  const owedTotal = getTotal(data.transactionSummaryWhereUserOwes);
  const owesTotal = getTotal(data.transactionSummaryWhereUserPaid);
  return {
    total: owedTotal - owesTotal,
    owed: owedTotal,
    owes: owesTotal,
  };
};

// group_id: "8fe0d740-855a-11eb-a41c-7dea59488261"
// group_name : "something"
// total_owed: 100
//
// user_that_owes: "Y@G.com"
//
// user_that_paid: "A@J.com"

const createArrayForDueList = (dueObject, owed) => {
  const userDetails = getCurrentUserData();
  const currentCurrency = userDetails.currency;
  // console.log(dueObject, owed);
  if (dueObject.length === 0) {
    return [];
  }
  let IDsList = [];
  const IDsListTotals = {};
  if (owed) {
    IDsList = dueObject.map((elem) => elem._id.userThatOwesEmail);
  } else {
    IDsList = dueObject.map((elem) => elem._id.userThatPaidEmail);
  }
  console.log(dueObject[0]._id);
  console.log('ID list', IDsList);

  for (let i = 0; i < IDsList.length; i += 1) {
    IDsListTotals[IDsList[i]] = 0;
  }
  const dueList = {};
  for (let i = 0; i < IDsList.length; i += 1) {
    dueList[IDsList[i]] = [];
  }
  for (let i = 0; i < dueObject.length; i += 1) {
    const currentUser = dueObject[i];
    console.log(currentUser);
    let currentName = '';
    if (owed) {
      currentName = currentUser._id.userThatOwesEmail;
    } else {
      currentName = currentUser._id.userThatPaidEmail;
    }
    IDsListTotals[currentName] += currentUser.total;
    if (owed) {
      dueList[currentName].push(`${currentName} owes you ${currencyFormatter(currentCurrency, currentUser.total)} from group: ${currentUser._id.groupName}`);
    } else {
      dueList[currentName].push(`You owe ${currentName} ${currencyFormatter(currentCurrency, currentUser.total)} from group: ${currentUser._id.groupName}`);
    }
  }
  return {
    dueList,
    totals: IDsListTotals,
  };
};

const getArrForSelect = (list) => {
  const selectArr = [];
  for (let i = 0; i < list.length; i += 1) {
    selectArr.push({ label: list[i], value: list[i] });
  }
  return selectArr;
};

export {
  getTotalBalance,
  createArrayForDueList,
  getArrForSelect,
};
