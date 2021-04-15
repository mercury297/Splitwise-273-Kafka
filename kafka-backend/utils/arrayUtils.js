const getIndexOfGroup = (groupsArr, groupName) => {
  for (let i = 0; i < groupsArr.length; i += 1) {
    if (groupsArr[i].groupName === groupName) {
      return i;
    }
  }
  return -1;
};

const createTxArray = (userThatPaid, owesList, amount, groupName, expense) => {
  const txArray = [];
  const amountOwed = amount / owesList.length;
  for (let i = 0; i < owesList.length; i += 1) {
    if (userThatPaid.email !== owesList[i].email) {
      txArray.push({
        userThatPaid,
        userThatOwes: owesList[i],
        amountOwed,
        groupName,
        expense,
      });
    }
  }
  return txArray;
};

const getOwesList = async (users) => {
  const fieldArray = users.map((user) => ({ name: user.name, email: user.email }));
  return fieldArray;
};

module.exports = {
  getIndexOfGroup,
  createTxArray,
  getOwesList,
};
