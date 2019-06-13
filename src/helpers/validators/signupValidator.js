import Joi from 'joi';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = {
  username: Joi.string()
    .trim()
    .min(3)
    .alphanum()
    .error(() => 'The username should only contain alphanumeric characters')
    .required(),
  email: Joi.string()
    .regex(emailRegex)
    .required()
    .error(() => 'Please provide a valid email'),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,}$/)
    .required()
    .error(() => 'Password should only be alphanumeric with at least 8 characters long'),
  confirmPassword: Joi.valid(Joi.ref('password')).options({
    language: {
      any: {
        allowOnly: 'should match the password'
      }
    }
  })
};

export default user => Joi.validate(user, schema);
