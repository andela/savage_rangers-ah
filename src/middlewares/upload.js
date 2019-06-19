import multer from 'multer';

const storage = multer.diskStorage({
});
const upload = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

export default upload;
