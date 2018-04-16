const upload = require( '../image/multerConfig.js' ).upload;
const isImageFile = require( '../image/isImageFile.js' );
const createPetPost = require( './createPetPost.js' );
const imgurUpload = require( '../image/imgurUpload.js' );
const base64Encode = require( '../image/base64Encode.js' )

const fs = require( 'fs' );

const minFileSize = 10*1024;
const maxSizeMB = 2;
const maxSize = maxSizeMB * 1024 * 1024;

const validateImageAndCreatePost = ( req, res, postType ) => {
  // Upload an image using multer and verify that file is png or jpeg.
  // Then create a post with values entered by user
  
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
        fs.unlinkSync( process.cwd() + filename ); // deletes uploaded file
        req.flash( 'notification', 'Photo must be a valid image file that is larger than 10 kB' );
        res.redirect('/posts/' + url );
        return;
      }
      console.log( file )

      imageString = base64Encode( file.path );
      
      imgurUpload( imageString )
      .then( 
        fulfilled =>{
          if ( fulfilled.status == 200 ) filename = fulfilled.data.link;
          console.log(  fulfilled.data.link)
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
          
          console.log( 'image uploaded successfully')
          
        })
      .catch( error => console.log( error ) );
      return;  
    }
    else{

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
      
    }
  });
  
}

module.exports = validateImageAndCreatePost;