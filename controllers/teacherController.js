const Teacher = require('../models/teacher');
const usosreq = require('../auth/UsosAuth')



const findTeacher = async (req, res,result) => {
  const { first_name, last_name } = req.query;

  console.log(req.query)
  try {
    const teacher = await Teacher.findOne({ first_name: first_name, last_name: last_name });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    };
    const id = teacher.id
    const request_data = {
        url: 'https://apps.usos.pwr.edu.pl/services/tt/staff?user_id='+id,
        method: 'GET',}
    usosreq.makeRequest(request_data.url,request_data.method,
      function(error,body) {
        // Process your data here
        console.log(body)
        const data = JSON.parse(body);
        
        console.log(data)

        res.render('index', { events: data });
    }
      )
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { findTeacher };