/**
 * reset password Validation Schema description file
 * @name reset.password
 */

import Joi from '@hapi/joi';

const string = Joi.string();
const email = string.email()
  .regex(/^[a-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)
  .required();

export default {
  resetPassword: Joi.object().keys({
    email,
  }),
  updatePassword: Joi.object().keys({
    password: string
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
      .min(5)
      .required()
  }),
  email,
};
