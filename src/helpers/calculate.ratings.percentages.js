/**
 * A fuction to calculate the percentage of ratings and to
 * generate a structured object of data
 * @param {Array} data - The array of the data to compute
 * @returns {Array} data - The computed array
 */
export default (data) => {
  // constructing the array to look like excpected
  data = data.map(rating => ({
    rating: rating.dataValues.rating,
    count: parseInt(rating.dataValues.count, 10)
  }));

  // initializing variables
  const ZERO = 0,
    HUNDRED = 100;
  const usersSum = data.reduce((total, user) => total + user.count, ZERO);
  const percentages = data.map((element) => {
    const ratio = element.count / usersSum;
    return ratio * HUNDRED;
  });

  // Rewriting the array after proceeding with calculations
  data = data.map(element => ({
    rating: element.rating,
    users: element.count,
    percentage: percentages[data.indexOf(element)]
  }));

  return {
    allUsers: usersSum,
    data
  };
};
