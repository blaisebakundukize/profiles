import multer from 'multer';
import path from 'path';

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes('csv')) {
    cb(null, true);
  } else {
    cb('Please upload only csv file', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.normalize(`${__dirname}/../../resources/static/assets/uploads/`)
    );
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-csvUsers-${file.originalname}`);
  },
});

export const uploadFile = multer({ storage, fileFilter: csvFilter });
