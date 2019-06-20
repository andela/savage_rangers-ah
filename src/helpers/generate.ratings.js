/* eslint-disable max-len */
import _ from 'lodash';

export default (ratingsPercentages, usersInfo, offset, limit) => {
  // grouping all the users by the rating
  const data = ratingsPercentages.data.map((percentageData) => {
    const usersDetails = usersInfo[0].filter(userInfoData => userInfoData.rating === percentageData.rating);
    return usersDetails;
  });
  //  mapping the array of ratings with all the information needed
  const ratingsWithUsersAndPercentage = ratingsPercentages.data.map(element => ({
    rating: element.rating,
    usersCount: element.users,
    percentage: element.percentage,
    usersInfo: data[ratingsPercentages.data.indexOf(element)].map(info => ({
      username: info.username,
      email: info.email,
      firstName: info.firstName,
      lastName: info.lastName,
      profileImage: info.profileImage
    }))
  }));

  // Applying the offset and the limit allUserCounts.filter(el => el >= offset + limit)
  const isOffsetInvalid = _.isEmpty(ratingsPercentages.data.map(item => item.users).filter(el => el >= offset + limit));
  let dataWithPagination;

  if (!isOffsetInvalid) {
    dataWithPagination = ratingsWithUsersAndPercentage.map(iteration => ({
      rating: iteration.rating,
      usersCount: iteration.usersCount,
      percentage: iteration.percentage,
      usersInfo: iteration.usersInfo.slice(offset, offset + limit)
    }));
  } else throw new Error('Invalid offset');

  return {
    allUsers: ratingsPercentages.allUsers,
    details: dataWithPagination
  };
};
