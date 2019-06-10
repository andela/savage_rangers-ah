import jwt from 'jsonwebtoken';

/**
 *
 *check the token if is valid
 * @param {*} token
 * @param {*} data
 * @return {Boolean} true the token status
 */
const isTokenValid = (token, data) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    return decoded.user.email === data.email && decoded.user.username === data.username;
  } catch (error) {
    return false;
  }
};

export default isTokenValid;
