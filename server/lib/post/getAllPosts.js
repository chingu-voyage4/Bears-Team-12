const Post = require( '../../models/post.js' );
const extractPostType = require( './extractPostType.js' );


const messageToUser = 'There was an error while attempting to retrieve post feed. Please contact administrator';

const perPage = 10;

const getAllPosts = ( page, postType, petName, zipCode, petType ) => {
  
  if (!page || page < 1) page = 1;
  
  const type = extractPostType( postType );
  
  const searchQuery =  queryBuilder( type, petName, zipCode, petType );
  
  console.log('searchQuery is ', searchQuery )
  
  return new Promise( ( resolve, reject ) => {
    Post.find( searchQuery )
    .sort( {createdAt: -1} )
    .skip( perPage *  ( page - 1 ) )
    .limit( perPage )
    .exec(
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
};

const queryBuilder = ( postType, petName, zipCode, petType ) => {
  const query = {
    
  }
  
  if( postType ) query.postType = postType;
  if( petType ) query.petType = petType;
  if( zipCode ) query.zipCode = zipCode;
  if( petName ) query.name = petName;
  
  return query;
}

module.exports = getAllPosts;