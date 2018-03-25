const getFoundPetPost = require( '../lib/post/getFoundPetPost.js' );
const getAllFoundPets = require( '../lib/post/getAllFoundPets.js' );
const createPetPost = require( '../lib/post/createPetPost.js' );

module.exports = {
  
  getAllFoundPetsPage: ( req, res ) => {
    res.sendFile(process.cwd() + '/public/found.html');   
  },
  
  getAllFoundPets: ( req, res ) => {
    console.log( req.query.page )
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
    res.sendFile(process.cwd() + '/public/foundpost.html');   
  },
  getFoundPetPost: ( req, res ) => {
    const { postId } = req.params;
    const type = 'FOUND';
    getFoundPetPost( postId, type )
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
    createFoundPetPost( req.body, req.user )
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
  }
}