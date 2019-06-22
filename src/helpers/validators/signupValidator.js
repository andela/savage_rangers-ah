import joi from '@hapi/joi';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = {
  username: joi
    .string()
    .trim()
    .alphanum()
    .error(() => 'The username should only contain alphanumeric characters')
    .required(),
  email: joi
    .string()
    .regex(emailRegex)
    .required()
    .error(() => 'Please provide a valid email'),
  password: joi
    .string()
    .regex(/^[a-zA-Z0-9]{8,}$/)
    .required()
    .error(() => 'Password should only be alphanumeric with at least 8 characters long'),
  confirmPassword: joi.valid(joi.ref('password')).options({
    language: {
      any: {
        allowOnly: 'should match the password'
      }
    }
  })
};

export default user => joi.validate(user, schema);
