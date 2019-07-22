/**
 * The reason why his file contains only one instance of 'events'
 * is to synchronize all the events that will be emitted in the whole
 * server
 *
 * @name eventEmitter
 * @author Prémices
 */

import EventEmitter from 'events';

export default new EventEmitter();
