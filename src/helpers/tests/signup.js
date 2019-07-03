import generateToken from '../tokens/generate.token';
/**
 * A function to get the token
 * with the username Burindy and id 1
 * @returns {object} token - The object that contains
 * the generated token
 */
export default () => {
  const user = {
    username: 'Burindi',
    email: 'alain1@gmail.com',
    id: 1
  };
  const authToken = generateToken(user, process.env.TOKEN_KEY);
  return authToken;
};
