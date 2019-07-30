import status from '../constants/status.codes';

export default ({ username, email }, token, res) => {
  res.status(status.CREATED).json({ user: { username, email, token } });
};
