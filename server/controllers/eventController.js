const Event = require('../models/event');
const Teacher = require('../models/teacher');

// Get all events for a specific teacher
const getAllEventsForTeacher = async (req, res) => {
  const teacherId = req.params.idteacher;
  console.log(teacherId)
  try {
    const teacher = await Teacher.findOne({ id: teacherId }).populate('Event');
    if (teacher) {
        console.log(teacher.Event)
      res.json(teacher.Event);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific event for a specific teacher
const getEventForTeacher = async (req, res) => {
  const teacherId = req.params.teacherId;
  const eventId = req.params.eventId;
  try {
    const teacher = await Teacher.findOne({ id: teacherId }).populate('Event');
    if (teacher) {
      const event = teacher.Event.find((event) => event.id === eventId);
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new event for a specific teacher
const createEventForTeacher = async (req, res) => {
    console.log(req.body)
  const { teacherId,title, start_time, end_time, id } = req.body;
  try {
    const teacher = await Teacher.findOne({ id: teacherId });
    if (teacher) {
      const event = new Event({ title, start_time, end_time, id });
      teacher.Event.push(event);
      await Promise.all([event.save(), teacher.save()]);
      res.status(201).json(event);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing event for a specific teacher
const updateEventForTeacher = async (req, res) => {
  const { title, start_time, end_time, eventId,teacherId} = req.body;
  console.log(req.body)
  try {
    const teacher = await Teacher.findOne({ id: teacherId }).populate('Event');
    if (teacher) {
        console.log('hmm')
      const event = teacher.Event.find((event) => event._id.toString() === eventId);
      if (event) {
        console.log('hmm2')
        event.title = title;
        event.start_time = start_time;
        event.end_time = end_time;
        await event.save();
        res.json(event);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};

const deleteEventForTeacher = async (req, res) => {
    const { teacherId,eventId} = req.body;
    console.log(req.body)
    try {
      const teacher = await Teacher.findOne({ id: teacherId }).populate('Event');
      if (teacher) {
        const event = teacher.Event.find((event) => event._id.toString() === eventId);
        if (event) {
          const eventIndex = teacher.Event.findIndex((event) => event._id.toString() === eventId);
          teacher.Event.splice(eventIndex, 1);
          await teacher.save();
          await Event.findByIdAndDelete(eventId);
          res.json({ message: 'Event deleted' });
        } else {
          res.status(404).json({ message: 'Event not found' });
        }
      } else {
        res.status(404).json({ message: 'Teacher not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
module.exports = { 
    getAllEventsForTeacher,
    getEventForTeacher,
    deleteEventForTeacher,
    updateEventForTeacher,
    createEventForTeacher
    };
    