const getPetPost = require( '../lib/post/getPetPost.js' );
const getAllPosts = require( '../lib/post/getAllPosts.js' );
const getAllLostPets = require( '../lib/post/getAllLostPets.js' );
const validateImageAndCreatePost = require( '../lib/post/validateImageAndCreatePost.js' );
const removePostFromUser = require( '../lib/post/removePostFromUser.js' );

module.exports = {
  
  getAllPetsPage: ( req, res ) => {
    
    const { postType } = req.params;
    
    const { petName, zipCode, petType } = req.query;
    
    let page = parseInt( req.query.page || 1);
    
    getAllPosts( page, postType, petName, zipCode, petType )
    .then(
      fulfilled => {
        
        const count = fulfilled.data.count;
        
        if ( page < 1) page = 1;
        
        res.render( './posts/feed', { 
          posts:        fulfilled.data.posts, 
          page:         'posts', 
          query:{
            page:         page,
            previousPage: ( page > 1 ) ? ( page - 1 ) : null,
            nextPage:     page * 10 <= count ? page + 1 : null ,  // multiplication by 1 changes string to int
            postType:     fulfilled.data.postType
          },
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
    
    let userId = '';
    
    if( req.user) userId = req.user._id;
    
    getPetPost( postId )
    .then( 
      fulfilled => {

        if( fulfilled.status == 'FAIL'){
          req.flash( 'notification', 'Post not found.');
          return res.redirect('/');
        } 
        
        let ownedByUser = false;
        
        const { post } = fulfilled.data;
        
        if( post.author.id == userId ) ownedByUser = true;
        
        if( post.postType == 'LOST'){
          res.render('./posts/lost', { 
            post: fulfilled.data.post, 
            page: 'post', 
            message: req.flash( 'notification' ),
            query:{
              postType: 'LOST',
              ownedByUser: ownedByUser
            },
            
          });
        }
        else{
          res.render('./posts/found', { 
            post: fulfilled.data.post, 
            page: 'post', 
            message: req.flash( 'notification' ),
            query:{
              postType: 'FOUND',
              ownedByUser: ownedByUser
            }
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
    
    const {petName, zipCode, petType, postType } = req.query;
    let page = parseInt( req.query.page || 1 );
    getAllPosts( page, postType, petName, zipCode, petType )
    .then( 
      fulfilled => {
        const count = fulfilled.data.count;
        const searchResults =fulfilled.data.posts;
        if ( page < 1) page = 1;
        res.render('./search', { 
          searchResults: searchResults,
          count:        count,
          page:         'posts',
          query:{
            count:        fulfilled.data.count,
            zipCode:      zipCode || undefined,
            petType:      petType || undefined,
            petName:      petName || undefined,
            postType:     postType || undefined,
            page:         page,
            firstEntry:   (10 * page - 9) || 1,
            lastEntry:    (10 * page) < count ? ( 10 * page ) : count,
            previousPage: ( page > 1 ) ? ( page - 1 ) : null,
            nextPage:     page * 10 <= count ? page + 1 : null   // multiplication changes string to int
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
  },
  
  deletePost: ( req, res ) => {
    
    if( !req.isAuthenticated() ) {
      req.flash( 'loginMessage', 'In order to remove a post you must first log in.' );
      res.redirect( '/login' )
      return;
    }
    
    const userId = req.user._id;
    const postId = req.params.postId;
    
    console.log( userId, postId )
    
    removePostFromUser( userId, postId )
    .then(
      fulfilled => {
        
        if( fulfilled.status == 'Fail'){
          req.flash( 'notification', 'There was an error when attempting to remove the post')
          return res.redirect('/dashboard')
        }
        
        req.flash( 'notification', 'Post removed sucessfully' );
        return res.redirect('/dashboard')
      },
      unfulfilled => {
        req.flash( 'notification', 'There was an error when attempting to remove the post')
        return res.redirect('/dashboard')
      }
    )
    .catch( error => console.log( error ) )
  }
  
}