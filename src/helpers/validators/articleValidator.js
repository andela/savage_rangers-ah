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
    .error(() => errorMessage.category),
  tags: joi
    .array()
    .items(joi.string().alphanum())
    .required()
});

export default article => joi.validate(article, schema);
