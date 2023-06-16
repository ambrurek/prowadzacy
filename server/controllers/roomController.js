const Room = require('../models/room');
const usosreq = require('../auth/UsosAuth')



const findRoom = async (req, res,result) => {
  const { id } = req.query;

  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const config = require('./../cfg'); // Importowanie konfiguracji
    const semesters = config.SEMESTERS;

    const requestPromises = [];
    const scheduleData = [];

    for (let i = 0; i < semesters.length; i++) {
      const semester = semesters[i];
      const start = semester.start;
      const end = semester.end;

      let currentStartDate;

      if (i === 0) {
        // Semestr 1
        currentStartDate = start;
      } else if (i === 1 && currentDate >= start && currentDate <= end) {
        // Aktualna data jest w semestrze 2
        currentStartDate = currentDate;
      } else {
        continue; // Pomijamy semestry, których jeszcze nie ma lub które już minęły
      }

      const getWeeklySchedule = (start) => {
        const formattedStart = start.toISOString().split('T')[0];
        const request_data = {
          url: `https://apps.usos.pwr.edu.pl/services/tt/room?room_id=${id}&start=${formattedStart}`,
          method: 'GET',
        };

        return new Promise((resolve, reject) => {
          usosreq.makeRequest(request_data.url, request_data.method, function (error, body) {
            if (error) {
              reject(error);
            }

            const data = JSON.parse(body);
            console.log(data)
            resolve(data);
          });
        });
      };

      while (currentStartDate <= end) {
        const weeklySchedulePromise = getWeeklySchedule(currentStartDate);
        requestPromises.push(weeklySchedulePromise);

        const nextWeekStartDate = new Date(currentStartDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        currentStartDate = nextWeekStartDate;
      }
    }

    Promise.all(requestPromises)
      .then((results) => {
        results.forEach((data) => {
          scheduleData.push(...data);
        });

        res.json({ events: scheduleData });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Error making request to external API', error });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const All = async (req,res,result) =>
  {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    const filter = {};
    const all = await Room.find(filter);
    res.send(all)
  };


module.exports = { findRoom,All };