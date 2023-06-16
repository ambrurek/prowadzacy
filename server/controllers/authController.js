const { request } = require('http');
const passport = require('passport');

const config = require('../cfg')
require('../auth/auth.js');
const path = require('path');

const FRONT = config.FRONTEND_URL


// Funkcja sprawdzająca domenę @prowadzacy.xxx.pl
const isTeacherEmail = (email) => {
    const domain = email.split('@')[1];
    return domain === 'prowadzacy.pwr.edu.pl';
  };
  
  // Funkcja sprawdzająca domenę @student.xxx
const isStudentEmail = (email) => {
    const domain = email.split('@')[1];
    return domain === 'student.pwr.edu.pl';
  };

const isAdminEmail = (email) => {
    const adminEmails = ['ambruzdmateusz@gmail.com', 'admin2@example.com']; // Dodaj tutaj adresy e-mail administratorów
    return adminEmails.includes(email);
  };
  
const auth_success = (req, res) => {
    if (req.user) {
      res.header('Access-Control-Allow-Origin', config.FRONTEND_URL);
      res.header('Access-Control-Allow-Credentials', 'true');
  
      const { email } = req.user;
      const isTeacher = isTeacherEmail(email);
      const isStudent = isStudentEmail(email);
      const isAdmin = isAdminEmail(email);
      res.status(200).json({
        error: false,
        message: "Successfully Logged In",
        user: req.user,
        isTeacher: isTeacher,
        isStudent: isStudent,
        isAdmin: isAdmin
      });
    } else {
      res.header('Access-Control-Allow-Origin', config.FRONTEND_URL);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
  };
  


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