import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, './src/publics/img');
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + '--' + file.originalname);
  },
});

const imgUpload = multer({ storage });

export default imgUpload;
