import jwt from 'jsonwebtoken';
import 'dotenv/config';
import isTokenDropped from '../helpers/tokens/getRedisToken';
import model from '../api/models';


const { User } = model;
const validToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'You are unauthorized'
    });
  }
  try {
    const decodeToken = await jwt.verify(token, process.env.TOKEN_KEY);
    const tokenStatus = await isTokenDropped(token);
    if (tokenStatus === 'dropped') {
      return res.send({ status: 401, error: 'Token is no longer valid' });
    }
    req.user = {
      id: decodeToken.user.id,
      username: decodeToken.user.username,
      email: decodeToken.user.email
    };
    await User.findOne({
      where: {
        email: req.user.email
      }
    });
    next();
  } catch (err) {
    res.status(403).json({
      status: 403,
      message: 'Forbiden access'
    });
  }
};

export default validToken;
