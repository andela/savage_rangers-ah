/**
 * Resgister midllemware file
 * @name register
 */
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import logger from 'morgan';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

/**
 * A function to register all the needed middlewares to the
 * app (express instance) every time the server is starting
 * @param {object} app - The express instance
 * @returns {Boolean} true
 */

export default (app) => {
  app
  // Parse req object and make data available on req.body
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session({
      // session
      saveUninitialized: true,
      secret: process.env.TWITTER_SESSION_KEY
    }))
    .use(passport.initialize())
    .use(cors()) // Allow cross origin requests
    .use(logger('dev')); // Logging http requests
  return true;
};
