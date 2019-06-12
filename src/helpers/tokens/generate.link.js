import jwt from 'jsonwebtoken';
import environment from '../../configs/environnements';

const env = environment.currentEnv;

/**
 * A fucntion to generate links based on jwt tokens
 *
 * @param {object} link - The user whose credentials have
 * to be used to generate the token
 * @param {object} payLoad - An object containing the payLoads
 * @returns {String} Link - The generated link
 */
export default (link, payLoad) => {
  const options = {
    expiresIn: '1d',
  };
  const token = jwt.sign(payLoad, env.secret, options);
  const Link = `${link}/${token}`;
  return Link;
};
