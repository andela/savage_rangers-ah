import status from '../constants/status.codes';
import models from '../../api/models/index';

const { User } = models;

export default (req, res, isBlocked, msgFragment) => {
  const { email } = req.params;
  const { username } = req;
  User.update({
    email,
    isBlocked
  },
  {
    where: {
      email
    }
  });
  return res.status(status.OK).json({
    status: status.OK,
    message: `${email} ${msgFragment}`,
    data: {
      username,
      email
    }
  });
};
