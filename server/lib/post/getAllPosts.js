// Grabs all posts from database and filters by 'post type' when ':postType' 
// param is included in the url

const Post = require( '../../models/post.js' );

const extractPostType = require( './extractPostType.js' );

const postQueryBuilder = require( './postQueryBuilder.js' );

const messageToUser = 'There was an error while attempting to retrieve post feed. Please contact administrator';

const perPage = 10;

const getAllPosts = ( page, postType, petName, zipCode, petType ) => {
  
  if ( !page || page < 1 ) page = 1;
  
  //const type = extractPostType( postType );
  
  const searchQuery =  postQueryBuilder( postType, petName, zipCode, petType );
  
  //console.log('searchQuery is ', searchQuery )
  
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



module.exports = getAllPosts;