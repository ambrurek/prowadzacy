const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
