import statusCode from '../constants/status.codes';
import sendError from '../error.sender';
/* istanbul ignore next: */
export default async (req, res, next, model, item) => {
  /**
   * @author Daniel Mwangila
   * @description Object.entries gets all the entries
   * that are in the req.params and
   * put them into a two dimensional array
   * e.g [[slug, How-to-seed]]
   * To get this values you would reference index 0 meaning
   * the first array then add another index in a
   * separate reference to get the values inside of the first array.
   * e.g key[0][0]
   * using the awesome power of back ticks you can generate a JSON string
   *e.g `
   { "${key[0][0]}": "${key[0][1]}", "isBlocked": "${isBlocked}" }
   `
   * Using JSON.parse() function converty it to JSON object
   * Then assign it to variable named 'where' that is passed into the
   * sequelize query to get the required data from the database.
   */
  const key = Object.entries(req.params);
  const jsonString = `{ "${key[0][0]}": "${key[0][1]}"}`;

  const where = JSON.parse(jsonString);

  const result = await model.findOne({ where });

  if (result) {
    req.article = result.dataValues;
  }

  return result
    ? next()
    : sendError(statusCode.NOT_FOUND,
      res,
      `${key[0][0]}`,
      `${item} with ${key[0][0]} ${key[0][1]} is not found, Thanks`);
};
