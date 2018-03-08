const createNewUser = require( '../lib/auth/createNewUser.js' );

module.exports ={
  getRegistrationPage: ( req, res ) => {
    res.sendFile(process.cwd() + '/views/register.html');   
  },
  createNewUser: ( req, res ) => {
    const { username, email, password } = req.body;
    createNewUser( username, email, password )
    .then( fulfilled => {

      if ( fulfilled.status === 'FAILED') {
        res.send( fulfilled.message );
      }
      else if ( fulfilled.status === 'SUCCESS' ){
        res.redirect('/login');
      }
      else{
        res.send({
          status: 'FAILED',
          message: 'UNKNOWN ERROR PLEASE CONTACT ADMINSTRATOR'
        });
      }
      
    })
    .catch( error => console.log( error ) );
  }
}