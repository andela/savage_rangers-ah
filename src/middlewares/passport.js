import { Strategy, ExtractJwt } from 'passport-jwt';
import models from '../api/models';
import env from '../configs/environments';

const { User } = models;
export default (passport) => {
  passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.secret
  },
  async ({ user: userData = {} }, done) => {
    try {
      const user = await User.findOne({ where: { id: userData.id } });
      done(null, user || false);
    } catch (error) {
      done(error);
    }
  }));
};
