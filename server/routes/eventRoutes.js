const express = require('express');
const ensure = require('./ensureAuth')

const router = express.Router();

const eventController = require('../controllers/eventController');

//Pobierz wszystkie wydarzenia dla konkretnego nauczyciela
router.get('/events/:idteacher', eventController.getAllEventsForTeacher);

//Pobierz konkretny event dla konkretnego nauczyciela
router.get('/event', eventController.getEventForTeacher);

//Utwórz nowe wydarzenie dla konkretnego nauczyciela
router.post('/event', eventController.createEventForTeacher);

//Zaktualizuj istniejące wydarzenie dla konkretnego nauczyciela
router.put('/event', eventController.updateEventForTeacher);

//Usuń wydarzenie dla konkretnego nauczyciela
router.delete('/event', eventController.deleteEventForTeacher);

module.exports = router;