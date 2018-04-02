const getPetPost = require( '../lib/post/getPetPost.js' );
const getAllFoundPets = require( '../lib/post/getAllFoundPets.js' );
const createPetPost = require( '../lib/post/createPetPost.js' );
const validateImageAndCreatePost = require( '../lib/post/validateImageAndCreatePost.js' );

module.exports = {
  
  getAllFoundPetsPage: ( req, res ) => {
    const page = req.query.page;
    getAllFoundPets( page )
    .then(
      fulfilled => {
        res.render('./posts/feed', { posts: fulfilled.data.posts, page: 'posts' });
      },
      unfulfilled => {
        console.log( 'There was an error retreiving found pet posts:', unfulfilled );
        res.end();
        return;
      }
    )
    .catch( error => console.log( error ) );  
  },
  
  getAllFoundPets: ( req, res ) => {
    const page = req.query.page;
    getAllFoundPets( page )
    .then(
      fulfilled => res.send( fulfilled )
      ,
      unfulfilled => {
        console.log( 'There was an error retreiving found pet posts:', unfulfilled );
        res.end();
        return;
      }
    )
    .catch( error => console.log( error ) );
  },
  
  getFoundPetPage: ( req, res ) => {
    const { postId } = req.params;
    const type = 'FOUND';
    getPetPost( postId, type )
    .then( 
      fulfilled => {
        res.render('./posts/found', { post: fulfilled.data.post, page: 'post' });  
      },
      unfulfilled => {
        console.log( 'There was an error while trying to retreive the post, ', unfulfilled );
        res.end();
        return;
      })
    .catch( error => console.log( error ) ) 
  },
  
  getFoundPetPost: ( req, res ) => {
    const { postId } = req.params;
    const type = 'FOUND';
    getPetPost( postId, type )
    .then( 
      fulfilled => {
        res.send( fulfilled.data );
      },
      unfulfilled => {
        console.log( 'There was an error while trying to retreive the post, ', unfulfilled );
        res.end();
        return;
      })
    .catch( error => console.log( error ) )
  },
  
  postFoundPetPost: ( req, res ) => {
    if( !req.isAuthenticated() ) {
      res.redirect('/')
      return;
    }
    validateImageAndCreatePost( req, res );
  },
  
  getCreateFoundPetPage: ( req, res ) => {
    res.render('./posts/foundform', { page: 'form' });
  }
  
}