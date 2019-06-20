import jwt from 'jsonwebtoken';
import env from '../../configs/environments';

/**
 * A function to decode the token
 *
 * @param {string} token - the token to decode
 * @returns {object} retObj - The object that contains
 * decoded playloads
 */
const decodeJwt = (token) => {
  let retObj;
  jwt.verify(token, env.secret, (err, decodedObj) => {
    if (!err) retObj = decodedObj;
  });
  return retObj;
};

export default decodeJwt;
