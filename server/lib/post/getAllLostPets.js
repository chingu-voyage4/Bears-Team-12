const Post = require( '../../models/post.js' );

const perPage = 3;

const getAllLostPets = ( page ) => {
  if (!page || page < 1) page = 1;
  console.log( page )
  return new Promise( ( resolve, reject ) => {
    Post.find( 
      {
        type: 'LOST'
      }
    )
    .sort( {createdAt: -1} )
    .limit( perPage  )
    .skip(perPage *  ( page -1 ) ) 
    .exec(
      ( error, posts ) => {
        console.log(posts)
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