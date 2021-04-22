const getArrayForSelect = (users) => {
  const userList = users.map((user) => ({
    label: user.email,
    value: user.email,
  }));
  return userList;
};

export default getArrayForSelect;
