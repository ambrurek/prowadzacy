const express = require('express');
const teacherController = require('../controllers/teacherController');
const ensure = require('./ensureAuth')

const router = express.Router();



router.get('/bynames',ensure.ensureAuthenticated, teacherController.findTeacher);


module.exports = router;