const multer = require('multer')
const uuidv4 = require('uuid/v4')
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'avatars',
  transformation: [
    { width: 200, height: 200 },
  ],
  allowedFormats: ['jpg', 'png'],
  filename(req, file, cb) {
    console.log('@@@@@file: ', file);
    cb(null, uuidv4());
  },
});

var parser = multer({ storage: storage }).single('avatar');

module.exports = parser
