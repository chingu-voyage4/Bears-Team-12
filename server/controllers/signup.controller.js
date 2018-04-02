const createNewUser = require( '../lib/auth/createNewUser.js' );

module.exports ={
  getSignupPage: ( req, res ) => {
    res.render('signup', { page: 'form' });   
  },
  createNewUser: ( req, res ) => {
    const { username, email, password } = req.body;
    createNewUser( username, email, password )
    .then( 
      fulfilled => {
        if ( fulfilled.status === 'SUCCESS' ){
          res.redirect('/login');
        }
        else{
          res.send( fulfilled );
        }
      },
      unfulfilled => {
        console.log( 'There was an error while trying to create a new user: ', unfulfilled);
        res.end();
        return;
      }
    )
    .catch( error => console.log( error ) );
  }
}