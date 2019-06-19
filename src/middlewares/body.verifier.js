import _ from 'lodash';
import sendError from '../helpers/error.sender';

export default (req, res, next) => {
  const error = 'Server unable to process the recieved data';
  if (_.isEmpty(req.body)) sendError(400, {}, res, error);
  else next();
};
