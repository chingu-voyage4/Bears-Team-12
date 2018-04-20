// Grabs all posts from database and filters by 'post type' when ':postType' 
// param is included in the url

const Post = require( '../../models/post.js' );

const extractPostType = require( './extractPostType.js' );

const postQueryBuilder = require( './postQueryBuilder.js' );

const messageToUser = 'There was an error while attempting to retrieve post feed. Please contact administrator';

const perPage = 10;

const getAllPosts = ( page, postType, petName, zipCode, petType ) => {
  
  if ( !page || page < 1 ) page = 1;
  
  let type = extractPostType( postType );
  
  const searchQuery =  postQueryBuilder( type, petName, zipCode, petType );
  
  return new Promise( ( resolve, reject ) => {
    Post.count( searchQuery ).exec( ( error, count ) => {
      if ( error ) {
        return reject({
          error:    error,
          message:  messageToUser 
        });
      }
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
              posts:    posts,
              count:    count,
              postType: type
            },
            message:  'OK'
          });
        }
      )
    })
  })
};



module.exports = getAllPosts;