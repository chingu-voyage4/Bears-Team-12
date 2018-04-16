const axios = require( 'axios' );
const FormData = require('form-data');
const fs = require( 'fs' );
const errorMessage = 'There was an error while attempting to upload an Image.';


const imgurUpload = ( imageString ) => {
  
  return new Promise( ( resolve, reject ) => {
    
    const config = {
      headers:{
        'Authorization': 'Client-ID ' + process.env.IMGUR_CLIENT_ID,
        'Content-Type': 'multipart/form-data'//boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      },
    }
    
    axios.post( 'https://api.imgur.com/3/image', imageString, config )
    .then( response => {
      return resolve( response.data );
    })
    .catch( error => { return console.log(error)  })
  })
}

module.exports = imgurUpload;