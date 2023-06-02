const { request } = require('http');
const passport = require('passport');

const config = require('../cfg')
require('../auth/auth.js');
const path = require('path');

const FRONT = config.FRONTEND_URL

const auth_success = (req,res) => {
    if (req.user) {
        res.header('Access-Control-Allow-Origin', config.FRONTEND_URL); // Dodaj tę linię
        res.header('Access-Control-Allow-Credentials', 'true'); // Dodaj tę linię
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
        res.header('Access-Control-Allow-Origin', config.FRONTEND_URL); // Dodaj tę linię
        res.header('Access-Control-Allow-Credentials', 'true'); // Dodaj tę linię
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
}

const auth_protected = (req, res) => {

    res.redirect(`${config.FRONTEND_URL}/wyszukiwarka`);
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
    passport.authenticate('google', { scope: [ 'email', 'profile' ],prompt: 'select_account' })(req,res);
}


module.exports = {
    auth_google,
    auth_failure, 
    auth_logout, 
    auth_callback,
    auth_protected,
    auth_success
  }