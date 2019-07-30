import cloudinary from 'cloudinary';

/* instanbul ignore next */
export default async (file, coverImage) => {
  const savedFile = await cloudinary.v2.uploader.upload(file.path);
  coverImage = savedFile.secure_url;

  return coverImage;
};
