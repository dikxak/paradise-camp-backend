const multer = require('multer');
const fs = require('fs');

const folderPath = './images';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // If "images" folder doesn't exists, create one
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filter,
});

module.exports = upload;
