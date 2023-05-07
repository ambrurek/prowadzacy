const passport = require('passport');


require('../auth/auth.js');
const path = require('path');



const auth_protected = (req, res) => {

    const filePath = path.join(__dirname, '../public', 'login.html');
    console.log("soldier chuj")
    res.sendFile(filePath);
}
const auth_callback = (req, res) => {
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
      })(req,res)
}
const auth_logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}
const auth_failure = (req, res) => {
    res.send('Failed to authenticate..');
}
const auth_google = (req, res) => {
    console.log('jestem w controlerze')
    passport.authenticate('google', { scope: [ 'email', 'profile' ],prompt: 'select_account' })(req,res);
}


module.exports = {
    auth_google,
    auth_failure, 
    auth_logout, 
    auth_callback,
    auth_protected
  }