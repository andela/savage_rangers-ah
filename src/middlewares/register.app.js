/**
 * Resgister midllemware file
 * @name register
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
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
    .use(cors()) // Allow cross origin requests
    .use(logger('dev')); // Logging http requests
  return true;
};
