const Room = require('../models/room');
const usosreq = require('../auth/UsosAuth')



const findRoom = async (req, res,result) => {
  const { building_id, room_number } = req.query;

  console.log(req.query)
  try {
    const room = await Room.findOne({ building_id: building_id, room_number: room_number });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    };
    const id = room.room_id

    const request_data = {
        url: 'https://apps.usos.pwr.edu.pl/services/tt/room?room_id='+id,
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

module.exports = { findRoom };