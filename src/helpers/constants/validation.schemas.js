/**
 * reset password Validation Schema description file
 * @name reset.password
 */

import Joi from '@hapi/joi';
import numbers from './numbers';

const string = Joi.string();
const minPasswordLength = 8,
  minProfileLength = 3;
const email = string
  .email()
  .regex(/^[a-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)
  .required();
const number = Joi.number();

const validRatings = {
  ONE_STAR: 1,
  TWO_STARS: 2,
  THREE_STARS: 3,
  FOUR_STARS: 4,
  FIVE_STARS: 5
};

const SLUG_MIN_LENTH = 3;
const SLUG_MAX_LENTH = 45;

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

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
    twitter: Joi.string()
  }),
  ratingRoute: Joi.object().keys({
    offset: number.required().default(DEFAULT_OFFSET),
    limit: number.required().default(DEFAULT_LIMIT),
    slug: string
      .min(SLUG_MIN_LENTH)
      .max(SLUG_MAX_LENTH)
      .required(),
    rating: number
      .valid([
        validRatings.ONE_STAR,
        validRatings.TWO_STARS,
        validRatings.THREE_STARS,
        validRatings.FOUR_STARS,
        validRatings.FIVE_STARS
      ])
      .required()
  }),

  rateArticle: Joi.object().keys({
    rating: number
      .valid(numbers.ONE, numbers.TWO, numbers.THREE, numbers.FOUR, numbers.FIVE)
      .required()
  }),
  reportArticle: Joi.object().keys({
    reason: number
      .min(1)
      .integer()
      .required()
  }),
  updateArticle: Joi.object().keys({
    title: Joi.string().allow(''),
    description: Joi.string().allow(''),
    body: Joi.string().allow(''),
    category: Joi.string()
      .uppercase()
      .allow(''),
    tagList: Joi.array()
      .items(Joi.string().alphanum())
      .allow('')
  }),
  highlight: Joi.object().keys({
    startIndex: Joi.number()
      .min(1)
      .required(),
    lastIndex: Joi.number()
      .min(1)
      .required(),
    text: Joi.string()
      .trim()
      .required(),
    comment: Joi.string()
      .trim()
      .required()
  }),

  postComment: Joi.object().keys({
    body: string.required(),
    parentCommentId: number.min(1)
  }),

  updateComment: Joi.object().keys({
    body: string.required()
  }),

  commentUpdateDeleteRoute: Joi.object().keys({
    id: number.required(),
    slug: string
      .min(SLUG_MIN_LENTH)
      .max(SLUG_MAX_LENTH)
      .required()
  }),

  getCommentRoute: Joi.object().keys({
    offset: number.required().default(DEFAULT_OFFSET),
    limit: number.required().default(DEFAULT_LIMIT),
    slug: string
      .min(SLUG_MIN_LENTH)
      .max(SLUG_MAX_LENTH)
      .required()
  })
};
