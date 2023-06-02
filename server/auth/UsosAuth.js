const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto')

const consumer_key = 'Y8weKuCTCRwsmhQ4DDBL';
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

function makeRequest(url, method, callback) {
    const request_data = {
        url: url,
        method: method
    };
    const signed_form = oauth.authorize(request_data,token);
    request(
        {
            url: url,
            method: method,
            headers: oauth.toHeader(oauth.authorize(request_data, token)),
        },
        function(error, response, body) {
            if (error) {+
                callback(error, null);
            } else {
                try {
                    callback(null, body);
                } catch (e) {
                    callback(e, null);
                }
            }
        }
    );
}
module.exports = {
    makeRequest
  }
