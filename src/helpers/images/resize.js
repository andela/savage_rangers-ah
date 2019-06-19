import sharp from 'sharp';
import path from 'path';

/**
 *
 *
 * @export
 * @class Resize
 */
export default class Resize {
  /**
   *Creates an instance of Resize.
   * @param {*} folder
   * @memberof Resize
   */
  constructor(folder) {
    this.folder = folder;
  }

  /**
   *
   *
   * @param {Buffer} buffer the image to upload
   * @param {String} filename the name to use
   * @param {Object} dimensions the width and height
   * @returns {String} filename
   * @memberof Resize
   */
  async save(buffer, filename, dimensions) {
    const filepath = this.filepath(filename);
    await sharp(buffer)
      .resize(dimensions.width, dimensions.height, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath, (err, info) => {
        if (err) {console.log(err);}
      });

    return filename;
  }

  /**
   *
   *
   * @param {String} filename
   * @returns {String} path to the image
   * @memberof Resize
   */
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}
