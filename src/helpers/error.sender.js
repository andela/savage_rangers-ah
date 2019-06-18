/**
 * A function to create an error object and use the the
 * res object to send it back to the client
 * @param {Number} status - The status code to send back
 * @param {object} resultObj - The result object to structure
 * before to send back
 * @param {Object} res - The res object
 * @param {String} error - THe error message to send
 * @returns {Boolean} true
 */
const sendError = (status, resultObj, res, error) => {
  const obj = resultObj;
  obj.status = status;
  obj.message = error;
  res.status(status).json(obj);
  return true;
};

export default sendError;
