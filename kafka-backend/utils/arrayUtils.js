const getIndexOfGroup = (groupsArr, groupName) => {
  for (let i = 0; i < groupsArr.length; i += 1) {
    if (groupsArr[i].groupName === groupName) {
      return i;
    }
  }
  return -1;
};

module.exports = {
  getIndexOfGroup,
};
