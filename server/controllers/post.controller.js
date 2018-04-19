const getPetPost = require( '../lib/post/getPetPost.js' );
const getAllPosts = require( '../lib/post/getAllPosts.js' );

const getAllLostPets = require( '../lib/post/getAllLostPets.js' );
const validateImageAndCreatePost = require( '../lib/post/validateImageAndCreatePost.js' );

module.exports = {
  
  getAllPetsPage: ( req, res ) => {
    
    const { postType } = req.params;
    
    const { page, petName, zipCode, petType } = req.query;

    getAllPosts( page, postType, petName, zipCode, petType )
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
  
  getAllPets: ( req, res ) => {
    const { postType } = req.params;
    
    const { page, petName, zipCode, petType } = req.query;

    getAllPosts( page, postType, petName, zipCode, petType )
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
  
  getPetPage: ( req, res ) => {
    const { postId } = req.params;
    getPetPost( postId )
    .then( 
      fulfilled => {
        if( fulfilled.data.postType == 'LOST'){
          res.render('./posts/lost', { 
            post: fulfilled.data.post, 
            page: 'post', 
            message: req.flash( 'notification' ),
          });
        }
        else{
          res.render('./posts/found', { 
            post: fulfilled.data.post, 
            page: 'post', 
            message: req.flash( 'notification' ),
          });
        }
      },
      
      unfulfilled => {
        req.flash( 'notification', unfulfilled.message )
        res.redirect('/');
        return;
      })
    .catch( error => console.log( 'There was an error attempting to retreive a found pet post: ', error ) )   
  },
  
  getPetPost: ( req, res ) => {
    
    const { postId } = req.params;
    
    getPetPost( postId )
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
  
  postPetPost: ( req, res ) => {
    
    if( !req.isAuthenticated() ) {
      req.flash( 'loginMessage', 'In order to create a post you must first log in.' );
      res.redirect('/login');
      return;
    }
    
    const { postType } = req.params;

    validateImageAndCreatePost( req, res,  postType );
  },
  
  getCreatePostPage: ( req, res ) => {
    
    if( !req.isAuthenticated() ) {
      req.flash( 'loginMessage', 'In order to create a post you must first log in.' );
      res.redirect( '/login' )
      return;
    }
    
    const { postType } = req.params;
    
    if( postType === 'lostpet' || postType === 'lostpets' ){
      res.render('./posts/lostform', { 
        page: 'form', 
        message: req.flash( 'notification' ),
      });
    }
    else{
      res.render('./posts/foundform', { 
        page: 'form', 
        message: req.flash( 'notification' ),
      });
    }
    
  },
  
  getSearchPage: ( req, res ) => {
    
    if (Object.keys( req.query ).length === 0 ) {
      return res.render('./search', { 
        searchResults: null, 
        query:  null,
        page: 'posts',
        message: req.flash( 'notification' ),
        firstRun: 1,
      });
    }
    
    const { page, petName, zipCode, petType, postType } = req.query;
    
    getAllPosts( page, postType, petName, zipCode, petType )
    .then( 
      fulfilled => {
        res.render('./search', { 
          searchResults: fulfilled.data.posts, 
          page: 'posts',
          query:{
            zipCode:  zipCode || undefined,
            petType:  petType || undefined,
            petName:  petName || undefined,
            postType: postType || undefined,
            page:     page || undefined
          },
          firstRun: 0,
          message: req.flash( 'notification' ),
        });
      },
      
      unfulfilled => {
        req.flash('notification', 'There was an error while attempting to search. Please contact site administrator.');
        res.redirect('/');
        return;
      })
    .catch( error => console.log( 'There was an error while attempting to search. ', error ) );
  },
  
  search: ( req, res ) => {
    
    const { page, petName, zipCode, petType, postType } = req.query;

    getAllPosts( page, postType, petName, zipCode, petType )
    .then( 
      fulfilled => {
        
        res.render('./posts/feed', { 
          posts: fulfilled.data.posts, 
          page: 'posts',
          message: req.flash( 'notification' ),
        })
      },
      
      unfulfilled => {
        req.flash('notification', 'There was an error while attempting to search. Please contact site administrator.');
        res.redirect('/');
        return;
      })
    .catch( error => console.log( 'There was an error while attempting to search. ', error ) );
  }
  
}