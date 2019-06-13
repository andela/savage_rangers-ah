import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ status: 403, message: 'Token is required' });
    }
    const decoded = jwt.verify(req.headers.authorization, process.env.TOKEN_KEY);
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'Authentication failed, please check your credentials',
    });
  }
};
