const getIndexOfGroup = (groupsArr, groupName) => {
  for (let i = 0; i < groupsArr.length; i += 1) {
    if (groupsArr[i].groupName === groupName) {
      return i;
    }
  }
  return -1;
};

const getIndexOfNote = (notesArr, noteID) => {
  for (let i = 0; i < notesArr.length; i += 1) {
    // eslint-disable-next-line no-underscore-dangle
    if (notesArr[i]._id === noteID) {
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
        userThatPaidEmail: userThatPaid.email,
        userThatPaidName: userThatPaid.name,
        userThatOwesEmail: owesList[i].email,
        userThatOwesName: owesList[i].name,
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
  getIndexOfNote,
};
