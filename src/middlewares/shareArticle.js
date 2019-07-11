
import open from 'open';
import dotenv from 'dotenv';
import env from '../configs/environments';
import models from '../api/models';

const { Article } = models;

dotenv.config();

const minimumValue = 0;
const { APP_URL_FRONTEND } = env;
const facebookShareURL = `https://web.facebook.com/sharer/sharer.php?u=${APP_URL_FRONTEND}/api/articles/`;
const twitterShareURL = `https://twitter.com/intent/tweet?text=${APP_URL_FRONTEND}/api/articles/`;
const linkedinShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${APP_URL_FRONTEND}/api/articles/`;

export default async (req, res, next) => {
  const { slug } = req.params;

  const { dataValues: { title } } = await Article.findOne({ where: { slug } });
  req.title = title;

  if (req.url.search(/\/facebook/g) > minimumValue) {
    req.sharedOn = 'facebook';
    await open(`${facebookShareURL}${slug}`, { wait: false });
  } else if (req.url.search(/\/twitter/g) > minimumValue) {
    req.sharedOn = 'twitter';
    await open(`${twitterShareURL}${slug}`, { wait: false });
  } else if (req.url.search(/\/linkedin/g) > minimumValue) {
    req.sharedOn = 'linkedin';
    await open(`${linkedinShareURL}${slug}`, { wait: false });
  } else if (req.url.search(/\/gmail/g) > minimumValue) {
    req.sharedOn = 'gmail';
    await open(`mailto:?subject=${title}&body=${APP_URL_FRONTEND}/articles/${slug}`,
      {
        wait: false
      });
  }

  next();
};
