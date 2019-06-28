import multer from 'multer';

const storage = multer.diskStorage({});
const sides = 4,
  width = 1024,
  height = 1024;
const upload = multer({
  storage,
  limits: {
    fileSize: sides * width * height
  }
});

export default upload;
