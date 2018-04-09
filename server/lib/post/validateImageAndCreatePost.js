const upload = require( '../image/multerConfig.js' ).upload;
const isImageFile = require( '../image/isImageFile.js' );
const createPetPost = require( './createPetPost.js' );
const fs = require( 'fs' );

const minFileSize = 10*1024;
const maxSizeMB = 2;
const maxSize = maxSizeMB * 1024 * 1024;

const validateImageAndCreatePost = ( req, res, postType ) => {
  // Upload an image using multer and verify that file is png or jpeg.
  // Then create a post with values entered by user
  
  upload( req, res, ( error ) => {
    if ( error )  console.log( error );
    
    console.log( req.file, req.body )
    
    const { url, file } = req;    
    
    let filename = 'no-image.jpg';
    
    if( file ){
      filename = '/user/images/' + file.filename;
      
      if( file.size > maxSize ) {
        req.flash( 'notification', 'Image file is too large. File must be smaller than ' + maxSizeMB + ' MB.' );  
        res.redirect('/posts/' + url );
        return; 
      }
      
      else if ( file.size < minFileSize || !isImageFile( file.path ) ) {               
      
        fs.unlinkSync( process.cwd() + '/public/user/images/' + filename ); // deletes uploaded file
        req.flash( 'notification', 'Photo must be a valid image file that is larger than 10 kB' );
        res.redirect('/posts/' + url );
        return;
        /*if( url === '/lostpet/new'){
          res.render('./posts/lostform', { 
            page: 'form', 
            message: req.flash( 'notification' ),
          });
        }
        else{
          res.render( './posts/foundform', { 
            page: 'form', 
            message: req.flash('notification'),
          });
        }
  
        return;*/
      }
    }

    createPetPost( req.body, req.user, filename, postType )
    .then( 
      fulfilled => {
        req.flash( 'notification', 'Post created succesfully' );
        res.redirect( '/')
      },
      unfulfilled => {
        req.flash( 'notification', unfulfilled.message );
        res.redirect( '/')
        console.log( 'Error while creating a post ', unfulfilled.error )
      })
    .catch( error => console.log( error ) );
  });
  
}

module.exports = validateImageAndCreatePost;