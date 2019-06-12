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
import errorMessages from '../../helpers/error.messages';

/**
 * A function to save an account when requested by the controller
 * @param {boolean} [useJoiError=false] - indicates that Joi
 * validation errors should be used
 * @param {object} schema - The validation schema comming from
 * the helper @ref validationSchemas
 */

// Initializing variables
// Allowed http methods
const _supportedMethods = ['get', 'post', 'patch', 'delete'];

// Joi validation options
const _validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

export default (useJoiError = false, schema, fields) => {
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

    if (_.includes(_supportedMethods, method)
        && _.has(Schemas, schema)
        && _.get(Schemas, schema)) {
      // get the schema for the route
      const _schema = _.get(Schemas, schema);

      // Validation happens here
      return Joi
        .validate(req
          .body, _schema, _validationOptions, (err, data) => {
          if (!err) {
            req.body = data;
            next();
          } else {
            // Building the error object
            let message = err.details[0].message
              .replace(/['"]/g, '');
            fields.find((el) => {
              if (message.includes(`${el} with value`) || message.includes(`${el} must be`)) {
                message = errorMessages[el];
              }
              return true;
            });
            // Default error
            const defaultErr = 'Invalid request data. Try again';

            _useJoiError
              ? sendError(400, {}, res, message)
              : sendError(400, {}, res, errorMessages[defaultErr]);
          }
        });
    }

    next();
  };
};
