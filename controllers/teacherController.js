const Teacher = require('../models/teacher');
const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto')

const consumer_key = 'Y8weKuCTCRwsmhQ4DDB';
const consumer_secret = '2UD4rhHB9cTCLrRHs8xXcEVbeHhDbTAfbh8F8Wtz';
const token = {
key: '89Df73qP6YAyQ49vBbpc',
secret: 'MfxMLvd6UyPjb4QtzMfu2FfZntcL5Jt3xmpgnNny'}

const oauth = new OAuth({
    consumer: { key: consumer_key, secret: consumer_secret },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString, key) {
      return crypto.createHmac('sha1', key).update(baseString).digest('base64');
    }
  });

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
    request(
        {
            url: request_data.url,
            method: request_data.method,
            form: oauth.authorize(request_data),
        },
        function(error, response, body) {
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