import Joi from '@hapi/joi';

const min = 3;
const schema = {
  country: Joi.string()
    .trim()
    .min(min)
    .error(() => 'The country is required should only contain alphanumeric characters')
    .required(),
  firstName: Joi.string()
    .trim()
    .min(min)
    .alphanum()
    .error(() => 'The firstName should only contain alphanumeric characters')
    .required(),
  lastName: Joi.string()
    .trim()
    .min(min)
    .alphanum()
    .error(() => 'The lastName should only contain alphanumeric characters')
    .required(),
  address: Joi.string()
    .trim()
    .error(() => 'The address is required')
    .required(),
  gender: Joi.string()
    .trim()
    .min(min)
    .alphanum()
    .error(() => 'The gender should only contain alphanumeric characters')
    .required(),
  phoneNumber: Joi.string()
    .trim()
    .error(() => 'The phone number is required')
    .required(),
  bio: Joi.string()
    .trim()
    .error(() => 'The bio is required')
    .required(),
  avatar: Joi.string(),
  facebook: Joi.string(),
  twitter: Joi.string(),
};

export default profile => Joi.validate(profile, schema);
