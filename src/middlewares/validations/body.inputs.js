/**
 * Schemas description file
 * @name validationMiddleware
 */
import _ from 'lodash';
import Joi from '@hapi/joi';
import Schemas from '../../helpers/constants/validation.schemas';
import sendError from '../../helpers/error.sender';
import errorMessages from '../../helpers/constants/error.messages';
import status from '../../helpers/constants/status.codes';
// Initializing variables
// Allowed http methods
const supportedMethods = ['get', 'post', 'patch', 'delete'];
// Joi validation options
const validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true // remove unknown keys from the validated data
};
/**
 * A function to save an account when requested by the controller
 * @param {boolean} [useJoiError=false] - indicates that Joi
 * validation errors should be used
 * @param {object} schema - The validation schema comming from
 * the helper @ref validationSchemas
 * @param {Array} fields - An array containing all the fileds to validate
 * provided especialy for custom error messages
 * @returns {Function} - A fuction validating the schema
 */
export default (useJoiError, schema, fields) => {
  const UseJoiError = _.isBoolean(useJoiError) && useJoiError;
  // validation middleware
  /**
   * A function to validate schemas
   * @param {object} req - the request object
   * @param {object} res - the result object
   * @param {function} next - callBack function
   * @returns {function} -
   */
  return (req, res, next) => {
    const method = req.method.toLowerCase();
    if (_.includes(supportedMethods, method) && _.has(Schemas, schema) && _.get(Schemas, schema)) {
      // get the schema for the route
      const currentSchema = _.get(Schemas, schema);
      // Validation happens here
      return Joi.validate(req.body, currentSchema, validationOptions, (err, data) => {
        if (!err) {
          req.body = data;
          next();
        } else {
          // Building the error object
          const joiError = {};
          joiError.message = err.details[0].message.replace(/['"]/g, '');
          // Building a custom error message
          fields.map((el) => {
            if (joiError.message.includes(`${el}`)) {
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
