const getPetPost = require( '../lib/post/getPetPost.js' );
const getAllLostPets = require( '../lib/post/getAllLostPets.js' );
const validateImageAndCreatePost = require( '../lib/post/validateImageAndCreatePost.js' );

module.exports = {
  
  getAllLostPetsPage: ( req, res ) => {
    const page = req.query.page;
    getAllLostPets( page )
    .then(
      fulfilled => {
        res.render( './posts/feed', { 
          posts: fulfilled.data.posts, 
          page: 'posts', 
          message: req.flash( 'notification' ),
        }); 
      },
      
      unfulfilled => {
        req.flash( 'notification', unfulfilled.message );
        res.redirect( '/' );
        return;
      }
    )
    .catch( error => console.log( 'There was an error retreiving all lost pet posts: ', error ) ); 
  },
  
  getAllLostPets: ( req, res ) => {
    const page = req.query.page;
    getAllLostPets( page )
    .then(
      fulfilled => res.send( fulfilled.data )
      ,
      unfulfilled => {
        console.log( 'There was an error retreiving lost pet posts:', unfulfilled.error );
        res.send( 'There was an error retreiving lost pet posts. Please contact site adminstrator.' );
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
        res.render('./posts/lost', { 
          post: fulfilled.data.post, 
          page: 'post', 
          message: req.flash( 'notification' ),
        });
      },
      
      unfulfilled => {
        req.flash( 'notification', unfulfilled.message )
        res.redirect('/');
        return;
      })
    .catch( error => console.log( 'There was an error attempting to retreive a found pet post: ', error ) )   
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
        console.log( 'There was an error while trying to retreive the post, ', unfulfilled.error );
        res.end();
        return;
      })
    .catch( error => console.log( error ) )
  },
  
  postLostPetPost: ( req, res ) => {
    if( !req.isAuthenticated() ) {
      req.flash( 'loginMessage', 'In order to create a post you must first log in.' );
      res.redirect('/login');
      return;
    }
    validateImageAndCreatePost( req, res, 'LOST' );
  },
  
  getCreateLostPetPage: ( req, res ) => {
    if( !req.isAuthenticated() ) {
      req.flash( 'loginMessage', 'In order to create a post you must first log in.' );
      res.redirect( '/login' )
      return;
    }
    res.render('./posts/lostform', { 
      page: 'form', 
      message: req.flash( 'notification' ),
    });
  }
  
}