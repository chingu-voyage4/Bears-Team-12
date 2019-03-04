const upload = require( '../image/multerConfig.js' ).upload;
const isImageFile = require( '../image/isImageFile.js' );
const createPetPost = require( './createPetPost.js' );
const imgurUpload = require( '../image/imgurUpload.js' );
const base64Encode = require( '../image/base64Encode.js' );

const genericError = 'There was an error. Please try again or contact an adminstrator';

const extractPostType = require( './extractPostType.js' );

const fs = require( 'fs' );

const minFileSize = 10*1024;
const maxSizeMB = 10;
const maxSize = maxSizeMB * 1024 * 1024;

const validateImageAndCreatePost = ( req, res, postType ) => {
  // Upload an image using multer and verify that file is png or jpeg.
  // Then create a post with values entered by user

  const type = extractPostType( postType );
  console.log('extracted type is ', type )
  upload( req, res, ( error ) => {
    if ( error )  console.log( error );
    
    let imageString = '';
    
    const { url, file } = req;    
    
    let filename = '/user/images/no-image';
    
    if( file ){
      
      if( file.size > maxSize ) {
        req.flash( 'notification', 'Image file is too large. File must be smaller than ' + maxSizeMB + ' MB.' );  
        res.redirect('/posts/' + url );
        return; 
      }
      
      else if ( file.size < minFileSize || !isImageFile( file.path ) ) {            
        fs.unlinkSync( file.path ); // deletes uploaded file
        req.flash( 'notification', 'Photo must be a valid image file that is larger than 10 kB' );
        res.redirect('/posts/' + url );
        return;
      }

      imageString = base64Encode( file.path );
      
      imgurUpload( imageString )
      .then( 
        fulfilled =>{
          if ( fulfilled.status == 200 ) filename = fulfilled.data.link;
          postPromiseHandler( req, res, filename, file, type );
        })
      .catch( error => console.log( error ) );
      return;  
    }
    else{
      postPromiseHandler( req, res, filename, file, type );
    }
  });
  
}

const postPromiseHandler = ( req, res, filename, file, type ) => {
  createPetPost( req.body, req.user, filename, type )
  .then( fulfilled => {
    fs.unlinkSync( file.path ); // deletes uploaded file
    req.flash( 'notification', 'Post created succesfully' );
    res.redirect( '/')
  })
  .catch( error => {
    fs.unlinkSync( file.path ); // deletes uploaded file
    req.flash( 'notification', error.message || genericError );
    res.redirect( '/')
    console.log( 'Error while creating a post ', error )
  });
}

module.exports = validateImageAndCreatePost;