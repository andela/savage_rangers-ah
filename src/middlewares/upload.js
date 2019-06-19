import multer from 'multer';

const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'public/');
//   },
//   filename(req, file, cb) {
//     console.log(file);
//     cb(null, file.originalname);
//   }
});
const upload = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

export default upload;
