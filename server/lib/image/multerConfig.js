const multer = require('multer');
const upload = multer({
  dest: process.cwd() + '/public/user/images',
}).single( 'petImage' ); 

module.exports = {
  upload
};