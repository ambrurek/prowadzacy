const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacherId: {
    type: Number,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  room_id: {
    type: Number,
    required: true
  }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation