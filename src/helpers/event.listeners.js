/* eslint-disable import/no-cycle */
/**
 * This file contains all event listeners of the server
 */

import eventEmitter from './event.emitter';
import reportArticle from './notifications/report.article';
import blockArticle from './notifications/block.article';
import reportComment from './notifications/report.comment';
import blockComment from './notifications/block.comment';

export default () => {
  // Article events
  eventEmitter.on('reportArticle', reportArticle);
  eventEmitter.on('blockArticle', blockArticle);
  eventEmitter.on('unblockArticle', blockArticle);

  // Comment events
  eventEmitter.on('reportComment', reportComment);
  eventEmitter.on('blockComment', blockComment);
  eventEmitter.on('unblockComment', blockComment);
};
