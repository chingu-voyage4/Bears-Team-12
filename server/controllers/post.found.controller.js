const getPetPost = require( '../lib/post/getPetPost.js' );
const getAllFoundPets = require( '../lib/post/getAllFoundPets.js' );
const validateImageAndCreatePost = require( '../lib/post/validateImageAndCreatePost.js' );

module.exports = {
  
  getAllFoundPetsPage: ( req, res ) => {
    const page = req.query.page;
    getAllFoundPets( page )
    .then(
      fulfilled => {
        res.render( './posts/feed', { 
          posts: fulfilled.data.posts, 
          page: 'posts', 
          message: req.flash( 'notification' ),
        });
      },
      
      unfulfilled => {
        req.flash( 'notification', unfulfilled.message  )
        res.redirect( '/' );
        return;
      }
    )
    .catch( error => console.log( 'There was an error retreiving all found pet posts: ', error ) );  
  },
  
  getAllFoundPets: ( req, res ) => {
    const page = req.query.page;
    getAllFoundPets( page )
    .then(
      fulfilled => res.send( fulfilled )
      ,
      unfulfilled => {
        console.log( 'There was an error retreiving found pet posts:', unfulfilled.error );
        res.send( 'There was an error retreiving found pet posts. Please contact adminstrator.' );
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
        res.render( './posts/found', { 
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
  
  getFoundPetPost: ( req, res ) => {
    const { postId } = req.params;
    const type = 'FOUND';
    getPetPost( postId, type )
    .then( 
      fulfilled => {
        res.send( fulfilled.data );
      },
      unfulfilled => {
        console.log( 'There was an error while trying to retreive the post, ', unfulfilled.error );
        res.send( 'There was an error while trying to retreive the post. Please contact administrator ' );
        return;
      })
    .catch( error => console.log( error ) )
  },
  
  postFoundPetPost: ( req, res ) => {
    if( !req.isAuthenticated() ) {
      req.flash( 'loginMessage', 'In order to create a post you must first log it.' );
      res.redirect( '/login' )
      return;
    }
    validateImageAndCreatePost( req, res, 'FOUND' );
  },
  
  getCreateFoundPetPage: ( req, res ) => {
    if( !req.isAuthenticated() ) {
      req.flash( 'loginMessage', 'In order to create a post you must first log it.' );
      res.redirect( '/login' )
      return;
    }
    res.render( './posts/foundform', { 
      page: 'form', 
      message: req.flash('notification'),
    });
  }
  
}