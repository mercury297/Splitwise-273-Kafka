const formats = ['USD', 'GBP', 'BHD', 'KWD', 'EUR', 'CAD'];

const currencyFormatter = (currency = 'USD', amount) => {
  let formatter = '';
  if (currency === null) {
    formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    });
  } else {
    formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    });
  }

  return formatter.format(amount);
};

const getConfig = () => {
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  return config;
};

const getCurrentUserData = () => {
  const currUserFromLS = JSON.parse(localStorage.getItem('user'));
  return currUserFromLS;
};

const removeCurrentUser = (users, currentUser) => {
  let index = -1;
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].email === currentUser.email) {
      index = i;
    }
  }
  console.log(users, index);
  if (index === -1) {
    return users;
  }
  users.splice(index, 1);
  console.log(users);
  return users;
};

export {
  formats,
  getConfig,
  removeCurrentUser,
  getCurrentUserData,
  currencyFormatter,
};
