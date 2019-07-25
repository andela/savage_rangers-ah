import Joi from '@hapi/joi';
import sendError from './error.sender';
import status from './constants/status.codes';

const parameterCheck = (Object, Schema, res, next) => {
  Joi.validate(Object,
    Schema,
    (err) => {
      if (!err) next();
      else {
        sendError(status.BAD_REQUEST,
          res,
          'url parameter',
          err.details[0].message.replace(/['"]/g, ''));
      }
    });
};

export default parameterCheck;
