/**
 * reset password Validation Schema description file
 * @name reset.password
 */

import Joi from '@hapi/joi';

export default {
  resetPassword: Joi.object().keys({
    email: Joi.string().email()
      .regex(/^[a-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)
      .required(),
  }),
};
