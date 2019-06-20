import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.API_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
