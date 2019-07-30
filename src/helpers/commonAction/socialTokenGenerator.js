import generateToken from '../tokens/generate.token';

export default (existingUser, req) => generateToken({
  username: req.user.displayName,
  id: existingUser.dataValues.id
},
process.env.TOKEN_KEY);
