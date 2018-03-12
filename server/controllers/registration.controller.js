const createNewUser = require( '../lib/auth/createNewUser.js' );

module.exports ={
  getRegistrationPage: ( req, res ) => {
    res.sendFile(process.cwd() + '/public/register.html');   
  },
  createNewUser: ( req, res ) => {
    const { username, email, password } = req.body;
    createNewUser( username, email, password )
    .then( 
      fulfilled => {
        if ( fulfilled.status === 'FAILED') {
          res.send( fulfilled.message );
        }
        else if ( fulfilled.status === 'SUCCESS' ){
          res.redirect('/login');
        }
        else{
          res.send({
            status: 'FAILED',
            message: 'UNKNOWN ERROR PLEASE CONTACT ADMINISTRATOR'
          });
        }
      },
      unfulfilled => {
        console.log( 'There was an error while trying to create a new user: ', unfulfilled)
      }
    )
    .catch( error => console.log( error ) );
  }
}