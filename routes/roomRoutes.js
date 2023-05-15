const express = require('express');
const roomController = require('../controllers/roomController');
const ensure = require('./ensureAuth')

const router = express.Router();



router.get('/byname',roomController.findRoom);
router.get('/all',roomController.All);



module.exports = router;