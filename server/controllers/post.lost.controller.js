const getPetPost = require( '../lib/post/getPetPost.js' );
const getAllLostPets = require( '../lib/post/getAllLostPets.js' );
const createPetPost = require( '../lib/post/createPetPost.js' );

module.exports = {
  
  getAllLostPetsPage: ( req, res ) => {
    res.sendFile(process.cwd() + '/public/lost.html');   
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
    res.sendFile(process.cwd() + '/public/lostpost.html');   
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
    createPetPost( req.body, req.user )
    .then( 
      fulfilled => {
      res.send( fulfilled )
      },
      unfulfilled => {
        console.log( unfulfilled )
        res.end();
        return;
      })
    .catch( error => console.log( error ) );
  },
  getCreateLostPetPage: ( req, res ) => {
    res.sendFile(process.cwd() + '/public/lostpost.html' );
  }
}