// eslint-disable-next-line import/no-cycle
import { io } from '../../index';
import env from '../../configs/environments';
import models from '../../api/models';
import sendNotification from './sender';

const { Article, User } = models;
/* istanbul ignore next */
export default async (operation, articleSlug) => {
  try {
    const message = {
      inAppMessage: '',
      emailMessage: '',
      emailButtonText: ''
    };

    const article = await Article.findOne({
      attributes: ['title'],
      include: {
        model: User,
        required: true,
        attributes: ['id', 'email', 'username']
      },
      where: {
        slug: articleSlug
      }
    });

    const emailUrl = `${env.APP_URL_FRONTEND}/api/articles/${articleSlug}`;
    const inApplUrl = `/articles/${articleSlug}`;

    message.inAppMessage = `The article ${article.title} has been ${operation}ed`;
    message.emailMessage = `The article ${article.title} has been ${operation}ed. Click the button bellow to follow up`;
    message.emailButtonText = 'Follow';

    const notification = await sendNotification('articles',
      'report',
      article.User,
      message,
      emailUrl,
      inApplUrl);
    io.emit(`${operation}Article`, notification);

    return notification;
  } catch (error) {
    return { errors: error };
  }
};
