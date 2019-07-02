import Joi from '@hapi/joi';

const string = Joi.string();
const number = Joi.number();
export default {
  showOn: Joi.object()
    .keys({
      show: Joi.boolean().required(),
      on: Joi.array()
        .items(Joi.string().valid(['report', 'block']))
        .required()
    })
    .required(),
  tags: Joi.array()
    .items(string.alphanum())
    .required(),
  reason: number
    .min(1)
    .integer()
    .required()
};
