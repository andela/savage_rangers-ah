import dotenv from 'dotenv';

import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { OAuth2Strategy } from 'passport-google-oauth';
import TwitterStrategy from 'passport-twitter';

dotenv.config();
const appPort = process.env.PORT;
const env = process.env.NODE_ENV;
const jwtSecret = process.env.TOKEN_KEY;
const mailerEmail = process.env.MAILER_EMAIL;
const mailerToken = process.env.MAILER_API_KEY;
const baseUrl = process.env.API_BASE_URL;
const hashRounds = process.env.BCRYPT_HASH_ROUNDS;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const devDatabase = process.env.DEV_DATABASE;
const testDatabase = process.env.TEST_DATABASE;
const host = process.env.HOST;
const dialect = 'postgres';
const port = process.env.DB_PORT;

const environments = [
  {
    name: 'test',
    appPort,
    dbUrl: process.env.TEST_DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds,
    username,
    password,
    database: testDatabase,
    host,
    dialect,
    port
  },
  {
    name: 'development',
    appPort,
    dbUrl: process.env.DEV_DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds,
    username,
    password,
    database: devDatabase,
    host,
    dialect,
    port
  },
  {
    name: 'production',
    appPort,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds,
    username,
    password,
    host,
    dialect,
    port
  },
  {
    name: 'stagging',
    appPort,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,

    baseUrl,
    hashRounds,
    username,
    password,
    database: devDatabase,
    host,
    dialect,
    port
  }
];

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  TWITTER_CALLBACK
} = process.env;

passport.use(new OAuth2Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK,
  profileFields: ['name', 'photos', 'email']
},
(accessToken, refreshToken, profile, done) => done(null, profile)));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: FACEBOOK_CALLBACK,
  profileFields: ['name', 'photos', 'email']
},
(accessToken, refreshTocken, profile, done) => done(null, profile)));

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CLIENT_ID,
  consumerSecret: TWITTER_CLIENT_SECRET,
  callbackURL: TWITTER_CALLBACK,
  profile: ['name', 'photo', 'email']
},
(accessToken, refreshTocken, profile, done) => {
  done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const currentEnv = environments.find(el => el.name === env.toLocaleLowerCase());
export default { currentEnv, env, passport };
