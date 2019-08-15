/**
 *
 * send the profile's response
 * @param {Object} res The result Object
 * @param {Integer} status The response Object
 * @param {String} message The response Object
 * @param {Object} profile The response Object
 * @param {Boolean} owner
 * @return {Object} The response Object
 */
export default (res, status, message, profile, owner) => res.status(status).json({
  message,
  profile,
  owner
});
