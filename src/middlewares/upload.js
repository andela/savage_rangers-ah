import multer from 'multer';

const storage = multer.diskStorage({
});
const e = 4, width = 1024, height = 1024;
const upload = multer({
  storage,
  limits: {
    fileSize: e * width * height,
  }
});

export default upload;
