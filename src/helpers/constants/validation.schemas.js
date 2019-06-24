/**
 * reset password Validation Schema description file
 * @name reset.password
 */

import Joi from '@hapi/joi';

const string = Joi.string();
const minPasswordLength = 8, minProfileLength = 3;
const email = string
  .email()
  .regex(/^[a-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)
  .required();

export default {
  resetPassword: Joi.object().keys({
    email
  }),
  updatePassword: Joi.object().keys({
    password: string
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
      .min(minPasswordLength)
      .required()
  }),
  email,
  profile: Joi.object().keys({
    country: string
      .trim()
      .min(minProfileLength)
      .required(),
    firstName: string
      .trim()
      .min(minProfileLength)
      .alphanum()
      .required(),
    lastName: Joi.string()
      .trim()
      .min(minProfileLength)
      .alphanum()
      .required(),
    address: Joi.string()
      .trim()
      .required(),
    gender: Joi.string()
      .trim()
      .min(minProfileLength)
      .alphanum()
      .required(),
    phoneNumber: Joi.string()
      .trim()
      .required(),
    bio: Joi.string()
      .trim()
      .required(),
    profileImage: Joi.string(),
    facebook: Joi.string(),
    twitter: Joi.string(),
  })
};
