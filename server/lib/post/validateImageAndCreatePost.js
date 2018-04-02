const upload = require( '../image/multerConfig.js' ).upload;
const isImageFile = require( '../image/isImageFile.js' );
const createPetPost = require( './createPetPost.js' );
const fs = require( 'fs' );
const minFileSize = 10*1024;

const validateImageAndCreatePost = ( req, res ) => {
  // Upload an image using multer and verify that file is png or jpeg.
  // Then create a post with values entered by user
  
  upload( req, res, ( error ) => {
    console.log( req.file )
    if ( error )  console.log( error );
    
    if( req.file.size < minFileSize || !isImageFile( req.file.path ) ){               // must be larger than 10kb and be a valid image file
      fs.unlinkSync( process.cwd() + '/public/user/images/' + req.file.filename ); // deletes uploaded file
      res.send( 'Photo must be a valid image file' );
      return;
    }
    
    createPetPost( req.body, req.user, req.file.filename )
    .then( 
      fulfilled => {
      res.send( fulfilled )
      },
      unfulfilled => {
        console.log( unfulfilled )
        res.end();
        return;
      })
    .catch( error => console.log( error ) );
  });
  
}

module.exports = validateImageAndCreatePost;