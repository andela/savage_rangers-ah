import model from '../../api/models/index';

const { User } = model;

export default (req, res, status, role, msgFragment) => {
  const { email } = req.params;
  const { username } = req;
  User.update({
    role
  },
  {
    where: {
      email
    }
  });
  return res.status(status).json({
    status,
    message: `${email} ${msgFragment}`,
    data: {
      username,
      email
    }
  });
};
