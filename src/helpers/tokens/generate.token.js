import jwt from 'jsonwebtoken';
import models from '../../api/models';

const { Token } = models;

const createToken = (user, secret) => {
  try {
    const token = jwt.sign({ user }, secret, {
      expiresIn: '24h'
    });

    Token.create({
      data: token
    });

    return token;
  } catch (error) {
    return 'error while processing a token';
  }
};

export default createToken;
