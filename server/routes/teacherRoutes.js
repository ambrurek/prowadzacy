const express = require('express');
const teacherController = require('../controllers/teacherController');
const ensure = require('./ensureAuth')

const router = express.Router();



router.get('/bynames',teacherController.findTeacher);
router.get('/all',teacherController.teacherAll);



module.exports = router;