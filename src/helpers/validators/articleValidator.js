import joi from '@hapi/joi';
import errorMessage from '../constants/error.messages';

const schema = joi.object().keys({
  title: joi
    .string()
    .error(() => errorMessage.title)
    .required(),
  description: joi.string().error(() => errorMessage.description),
  body: joi.string().error(() => errorMessage.body),
  tags: joi.array().items(joi.string().alphanum()),
  category: joi
    .number()
    .min(1)
    .error(() => errorMessage.category),
  coverImage: joi.string()
});

export default article => joi.validate(article, schema);
