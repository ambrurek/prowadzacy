const Teacher = require('../models/teacher');
const usosreq = require('../auth/UsosAuth');
const { removeAllListeners } = require('../models/teacher');



const findTeacher = async (req, res,result) => {
  const { first_name, last_name } = req.query;
  try {
    const teacher = await Teacher.findOne({ first_name: first_name, last_name: last_name });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    };
    const request_data = {
        url: 'https://apps.usos.pwr.edu.pl/services/tt/staff?user_id='+teacher.id,
        method: 'GET',}
    usosreq.makeRequest(request_data.url,request_data.method,
      function(error,body) {
        const data = JSON.parse(body);
        res.render('index', { events: data });
    }
      )
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const teacherAll = async (req,res,result) =>
  {
    const filter = {};
    const all = await Teacher.find(filter);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Dodaj tę linię
    res.json(all)
  };

module.exports = { 
findTeacher,
teacherAll
};

