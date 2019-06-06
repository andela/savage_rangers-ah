/**
 * Resgister midllemware file
 * @name register
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import environnements from '../configs/environnements';
/**
 * A function to register all the needed middlewares to the
 * app (express instance) every time the server is starting
 * @param {object} app - The express instance
 * @returns {Boolean} true
 */

const env = environnements();

export default (app) => {
  app
    // Parse req object and make data available on req.body
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors()); // Allow cross origin requests

  if (env.name === 'development') {
    // Logging http requests
    app.use(logger('dev'));
  }
  return true;
};
