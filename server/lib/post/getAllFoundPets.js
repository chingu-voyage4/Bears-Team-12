const Post = require( '../../models/post.js' );

const messageToUser = 'There was an error while attempting to retrieve founds pets from database. Please contact administrator';

const perPage = 10;

const getAllFoundPets = ( page ) => {
  return new Promise( ( resolve, reject ) => {
    Post.find( 
      {
        postType: 'FOUND'
      },
      {
        
      },
      {
        sort: {createdAt: -1} ,
        skip: perPage *  ( page - 1 ) ,
        limit: 10,
      },
      ( error, posts ) => {
        if ( error ) {
          return reject({
            error:    error,
            message:  messageToUser 
          });
        }
        resolve({
          status:   'SUCCESS',
          data: {
            posts: posts
          },
          message:  'OK'
        });
      }
    )
  })
}

module.exports = getAllFoundPets;