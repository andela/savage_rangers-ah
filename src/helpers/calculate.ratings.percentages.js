/* eslint-disable array-callback-return */
/**
 * A fuction to calculate the percentage of ratings and to
 * generate a structured object of data
 * @param {Array} data - The array of the data to compute
 * @returns {Array} data - The computed array
 */
export default (data) => {
  // constructing the array to look like excpected
  const MAX_DATA_LENGTH = 5;
  data = data.map(rating => ({
    rating: rating.dataValues.rating,
    count: parseInt(rating.dataValues.count, 10)
  }));

  // initializing variables
  const INITIAL_ARRAY_INDEX = 0,
    HUNDRED = 100;
  const usersSum = data.reduce((total, user) => total + user.count, INITIAL_ARRAY_INDEX);
  const percentages = data.map((element) => {
    const ratio = element.count / usersSum;
    return Math.round(ratio * HUNDRED);
  });

  // Rewriting the array after proceeding with calculations
  data = data.map(element => ({
    rating: element.rating,
    users: element.count,
    percentage: percentages[data.indexOf(element)]
  }));

  if (data.length < MAX_DATA_LENGTH) {
    const newData = ['1', '2', '3', '4', '5'];
    data.map((item) => {
      if (item.rating) newData[item.rating - 1] = item;
    });
    newData.map((item) => {
      if (!item.rating) {
        newData[newData.indexOf(item)] = {
          rating: parseInt(item, 10),
          users: 0,
          percentage: 0
        };
      }
    });
    return {
      allUsers: usersSum,
      statistics: newData
    };
  }

  return {
    allUsers: usersSum,
    statistics: data
  };
};
