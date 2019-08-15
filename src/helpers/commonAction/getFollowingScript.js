import generatePagination from '../generate.pagination.details';
import status from '../constants/status.codes';
import errorSender from '../error.sender';

export default async (req, res, list, sequelize, error, table) => {
  const emptyArrayLength = 0;
  const defaultOffset = 0;
  const defaultLimit = 10;
  let data = {};

  const { username } = req.params;
  const { username: connectedUsername } = req.user.user;
  const offset = req.query.offset || defaultOffset;
  const limit = req.query.limit || defaultLimit;

  const followerList = await sequelize.query(`
    SELECT ${table},u."profileImage"
    FROM followings as f 
    INNER JOIN public."Users" as u ON f.${list} = u.username 
    WHERE f.${list} = '${username || connectedUsername}'
    LIMIT '${limit}' OFFSET '${offset}'
    `);
  data = generatePagination(followerList[1].rowCount, followerList[1].rows, offset, limit);

  if (list === 'following') {
    data.followers = followerList[1].rows;
  } else {
    data.following = followerList[1].rows;
  }

  if (followerList[1].rows.length > emptyArrayLength) {
    res.status(status.OK).json({
      status: 200,
      data
    });
  } else {
    errorSender(status.NOT_FOUND, res, table, error);
  }
};
