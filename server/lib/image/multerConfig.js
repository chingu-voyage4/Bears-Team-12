const multer = require('multer');
const upload = multer({
  dest: process.cwd() + '/public/user/images',
  limits: {
    fileSize: 500 * 1024     // file size limit 500 KB
  }
}).single( 'image' ); 

module.exports = {
  upload
};