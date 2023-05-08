const Room = require('../models/room');
const usosreq = require('../auth/UsosAuth')



const findRoom = async (req, res,result) => {
  const { building_id, room_number } = req.query;
  try {
    const room = await Room.findOne({ building_id: building_id, room_number: room_number });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    };
    const request_data = {
        url: 'https://apps.usos.pwr.edu.pl/services/tt/room?room_id='+room.room_id,
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

const All = async (req,res,result) =>
  {
    const filter = {};
    const all = await Room.find(filter);
    res.send(all)
  };


module.exports = { findRoom,All };