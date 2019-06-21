/* eslint-disable no-unused-expressions */
/**
 * Schemas description file
 * @name validationMiddleware
 */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import Joi from '@hapi/joi';
import Schemas from '../../helpers/validation.schemas';
import sendError from '../../helpers/error.sender';
import errorMessages from '../../helpers/constants/error.messages';
import status from '../../helpers/constants/status.codes';

// Initializing variables
// Allowed http methods
const _supportedMethods = ['get', 'post', 'patch', 'delete'];

// Joi validation options
const _validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true // remove unknown keys from the validated data
};

export default (useJoiError, schema, fields) => {
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

  // validation middleware
  /**
   * A function to validate schemas
   * @param {object} req - the request object
   * @param {object} res - the result object
   * @param {function} next - callBack function
   */
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (_.includes(_supportedMethods, method) && _.has(Schemas, schema) && _.get(Schemas, schema)) {
      // get the schema for the route
      const _schema = _.get(Schemas, schema);

      // Validation happens here
      return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {
        if (!err) {
          req.body = data;
          next();
        } else {
          // Building the error object
          const joiError = {};
          joiError.message = err.details[0].message.replace(/['"]/g, '');
          // Building a custom error message
          fields.find((el) => {
            if (
              joiError.message.includes(`${el} with value`)
              || joiError.message.includes(`${el} must be`)
            ) {
              joiError.message = errorMessages[el];
              joiError.field = el;
            }
            return true;
          });
          if (UseJoiError) {
            sendError(status.BAD_REQUEST, res, joiError.field, joiError.message);
          } else {
            sendError(status.BAD_REQUEST, res, 'body', errorMessages.defaultError);
          }
        }
      });
    }
  };
};
