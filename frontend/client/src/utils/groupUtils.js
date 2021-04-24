const getArrayForSelect = (users) => {
  const userList = users.map((user) => ({
    label: user.email,
    value: user.email,
  }));
  return userList;
};

const divideGroupsArray = (groups) => {
  const invites = groups.filter((group) => group.inviteAccepted === false);
  const myGroups = groups.filter((group) => group.inviteAccepted === true);
  return {
    invites,
    myGroups,
  };
};

export {
  getArrayForSelect,
  divideGroupsArray,
};
