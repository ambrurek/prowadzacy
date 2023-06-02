const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require('./event')

const teacherSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  massage:
  {
    type: String,
    required: false
  },
  Event: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: false
  }],
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
