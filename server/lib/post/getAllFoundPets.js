const Post = require( '../../models/post.js' );

const getAllLostPets = () => {
  return new Promise( ( resolve, reject ) => {
    Post.find( 
      {
        type: 'FOUND'
      },
      {
        limit: 10
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
}