//---------------------- User's profile router ------------------------------------
const getUserInfoById = require( '../lib/user/getUserInfoById.js' );

module.exports = {
  getDashboardPage: ( req, res ) => {
    const auth = req.isAuthenticated();
    
    if( !auth ){
      req.flash( 'loginMessage', 'You must be logged in to do that' );
      res.redirect('/login');
      return;
    }
    
    res.render( 'dashboard', {
      page: 'dashboard',
      message: req.flash( 'notification' )
    });
    return;
    
    /*const userId = req.user._id;
    const otherId = req.params.id;
    
    if( userId === otherId ){
      // profile belongs to same person who is logged in   <-- res.locals has the data
      // 
     
    }
    else {
      // profile of person other than currently logged in user
      getUserInfoById( userId )
      .then( 
        fulfilled => {
          // do something with fullfilled.data.user
          const { user } = fulfilled;
          res.render( 'profile', {
            page: 'profile',
            userProfile: {
              userName:  user.local ? user.local.username : user.facebook ? user.facebook.name : user.google ? user.google.name : user.twitter ? user.twitter.displayName : 'NO ID',
              posts: user.posts,
            },
            message: req.flash( 'notification' )
          });
          return;
        },
        unfulfilled => {
          req.flash( 'notification', unfulfilled.message );
          res.redirect( '/' );
          return;
        }
      )
      .catch( error => console.log( 'There was an error getting currently logged in user\'s profile: ', error ) );
    }*/
  
  }
}
