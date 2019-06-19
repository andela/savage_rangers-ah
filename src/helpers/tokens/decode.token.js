import jwt from 'jsonwebtoken';

/**
 * A function to decode the token
 *
 * @param {string} token - the token to decode
 * @returns {object} retObj - The object that contains
 * decoded playloads
 */
const decodeJwt = (token) => {
  const { secret } = process.env;
  let retObj;
  jwt.verify(token, secret, (err, decodedObj) => {
    if (!err) retObj = decodedObj;
  });
  return retObj;
};

export default decodeJwt;
