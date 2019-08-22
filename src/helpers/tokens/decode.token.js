import jwt from 'jsonwebtoken';
import env from '../../configs/environments';

/**
 * A function to decode the token
 *
 * @param {string} token - the token to decode
 * @returns {object} retObj - The object that contains
 * decoded payloads
 */
const decodeJwt = (token) => {
  let retObj;
  jwt.verify(token, env.secret, (err, decodedObj) => {
    if (!err) retObj = decodedObj;
    else throw new Error(`Could not decode the token${err}`);
  });
  return retObj;
};

export default decodeJwt;
