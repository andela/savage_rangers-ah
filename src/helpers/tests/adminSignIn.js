import generateToken from '../tokens/generate.token';
/**
 * A function to generate a token for an admin.
 *
 * @returns {object} token - The object that contains
 * the generated token
 */
export default () => {
  const user = {
    username: 'BurindiAlain12',
    email: 'alain12@gmail.com',
    id: 12
  };
  const authToken = generateToken(user, process.env.TOKEN_KEY);
  return authToken;
};
