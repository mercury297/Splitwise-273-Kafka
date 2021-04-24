/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
const types = {
  CREATE_GROUP: 'created group', ADD_EXPENSE: 'added expense', ADD_NOTE: 'added note', DELETE_NOTE: 'deleted note',
};

const getActivitySummary = (email, groupName, operation) => {
  const operationType = types[operation];
  console.log(operationType, operation);
  if (operation === 'CREATE_GROUP') {
    return `${email} ${operationType} ${groupName}`;
  }
  return `${email} ${operationType} in group ${groupName}`;
};

const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(date).getDay();
  const dateOfWeek = new Date(date).getDate();
  return isNaN(dayOfWeek) ? null
    : `${dateOfWeek}  ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]}`;
};

const getTableData = (data) => {
  const columns = [
    {
      label: 'Group Name',
      field: 'groupName',
      sort: 'asc',
    },
    {
      label: 'Recent Activity',
      field: 'activity',
      sort: 'asc',
    },
  ];
  const rows = [];
  for (let i = 0; i < data.length; i += 1) {
    rows.push({
      id: data[0]._id,
      groupName: data[i].groupName,
      activity: getActivitySummary(data[i].name, data[i].groupName, data[i].operationType),
    });
  }
  return {
    columns,
    rows,
  };
};

const compare = (a, b) => {
  if (a._id < b._id) {
    return -1;
  }
  if (a._id > b._id) {
    return 1;
  }
  return 0;
};

const sortDataByID = (data) => {
  data.rows.sort(compare);
  return data;
};

export {
  getActivitySummary,
  getDayOfWeek,
  getTableData,
  sortDataByID,
};
