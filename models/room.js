const mongoose = require('mongoose');
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
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
