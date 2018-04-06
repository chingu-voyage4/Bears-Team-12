//---------------------- User's profile router ------------------------------------
const getUserInfoById = require( '../lib/user/getUserInfoById.js' );

module.exports = {
  getProfilePage: ( req, res ) => {
    const auth = req.isAuthenticated();
    
    if( !auth ){
      req.flash( 'notification', 'You must be logged in to do that' );
      res.redirect('/');
      return;
    }
    const userId = req.user._id;
    const otherId = req.params.id;
    
    if( userId === otherId ){
      // profile belongs to same person who is logged in   <-- res.locals has the data
      // 
      return;
    }
    else {
      // profile of person other than currently logged in user
      getUserInfoById( userId )
      .then( 
        fulfilled => {
          // do something with fullfilled.data.user
          return;
        },
        unfulfilled => {
          req.flash( 'notification', unfulfilled.message );
          res.redirect( '/' );
          return;
        }
      )
      .catch( error => console.log( 'There was an error getting currently logged in user\'s profile: ', error ) );
    }
  
  }
}
