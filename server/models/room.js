const mongoose = require('mongoose');
const Event = require('./event')
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
  room_id: {
    type: Number,
    required: true
  },
  building_id: {
    type: String,
    required: true
  },
  room_number: {
    type: String,
    required: true
  },
  Events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: false
  }],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
