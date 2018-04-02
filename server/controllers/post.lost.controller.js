const getPetPost = require( '../lib/post/getPetPost.js' );
const getAllLostPets = require( '../lib/post/getAllLostPets.js' );
const validateImageAndCreatePost = require( '../lib/post/validateImageAndCreatePost.js' );

module.exports = {
  
  getAllLostPetsPage: ( req, res ) => {
    const page = req.query.page;
    getAllLostPets( page )
    .then(
      fulfilled => {
        res.render('./posts/feed', { posts: fulfilled.data.posts, page: 'posts' }); 
      },
      unfulfilled => {
        console.log( 'There was an error retreiving lost pet posts:', unfulfilled );
        res.end();
        return;
      }
    )
    .catch( error => console.log( error ) );  
  },
  
  getAllLostPets: ( req, res ) => {
    const page = req.query.page;
    getAllLostPets( page )
    .then(
      fulfilled => res.send( fulfilled.data )
      ,
      unfulfilled => {
        console.log( 'There was an error retreiving lost pet posts:', unfulfilled );
        res.end();
        return;
      }
    )
    .catch( error => console.log( error ) );
  },
  
  getLostPetPage: ( req, res ) => {
    const { postId } = req.params;
    const type = 'LOST';
    getPetPost( postId, type )
    .then( 
      fulfilled => {
        res.render('./posts/lost', { post: fulfilled.data.post, page: 'post' });
      },
      unfulfilled => {
        console.log( 'There was an error while trying to retreive the post, ', unfulfilled );
        res.end();
        return;
      })
    .catch( error => console.log( error ) )   
  },
  
  getLostPetPost: ( req, res ) => {
    const { postId } = req.params;
    const type = 'LOST';
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
  
  postLostPetPost: ( req, res ) => {
    if( !req.isAuthenticated() ) {
      res.redirect('/')
      return;
    }
    validateImageAndCreatePost( req, res );
  },
  
  getCreateLostPetPage: ( req, res ) => {
    res.render('./posts/lostform', { page: 'form' });
  }
  
}