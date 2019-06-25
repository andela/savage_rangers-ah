/**
 * reset password Validation Schema description file
 * @name reset.password
 */

import Joi from '@hapi/joi';

const string = Joi.string();
const email = string
  .email()
  .regex(/^[a-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)
  .required();

const THREE = 3;
const FIVE = 5;
const THIRTY = 30;

export default {
  resetPassword: Joi.object().keys({
    email
  }),
  updatePassword: Joi.object().keys({
    password: string
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
      .min(FIVE)
      .required()
  }),
  email,
  addArticleTag: Joi.object().keys({
    tag: string
      .regex(/^[A-Za-z]+$/)
      .min(THREE)
      .max(THIRTY)
      .required()
  })
};
