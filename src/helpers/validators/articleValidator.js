import joi from '@hapi/joi';
import errorMessage from '../constants/error.messages';

const schema = joi.object().keys({
  title: joi
    .string()
    .error(() => errorMessage.title)
    .required(),
  description: joi
    .string()
    .required()
    .error(() => errorMessage.description),
  body: joi
    .string()
    .required()
    .error(() => errorMessage.body),
  category: joi
    .string()
    .required()
    .uppercase()
    .error(() => errorMessage.category)
});

export default article => joi.validate(article, schema);
