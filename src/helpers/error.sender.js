/**
 * A function to create an error object and use the the
 * res object to send it back to the client
 * @param {Number} status - The status code to send back
 * @param {Object} res - The res object
 * @param {String} field - the invalid filed rasing the error
 * @param {String} error - THe error message to send
 * @returns {Boolean} true
 */
const sendError = (status, res, field, error) => {
  const resultObj = {
    status,
    errors: {}
  };
  resultObj.errors[field] = error;
  res.status(status).json(resultObj);
  return true;
};

export default sendError;
