const express = require('express');
const authController = require('../controllers/authController');
const ensure = require('./ensureAuth')

const router = express.Router();



router.get('/protected',ensure.ensureAuthenticated, authController.auth_protected);
router.get('/google', authController.auth_google);
router.get('/google/callback', authController.auth_callback);
router.get('/logout', authController.auth_logout);
router.get('/success', authController.auth_success);

router.delete('/auth/google/failure', authController.auth_failure);

module.exports = router;