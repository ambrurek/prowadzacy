const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
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
  id:{
    type: String,
    required: true
  }

});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event