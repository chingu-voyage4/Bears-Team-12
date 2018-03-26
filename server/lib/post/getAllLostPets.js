const Post = require( '../../models/post.js' );

const perPage = 10;

const getAllLostPets = ( page ) => {
  if (!page || page < 1) page = 1;
  return new Promise( ( resolve, reject ) => {
    Post.find( 
      {
        postType: 'LOST'
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
          reject( error );
          return;
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
};

module.exports = getAllLostPets;