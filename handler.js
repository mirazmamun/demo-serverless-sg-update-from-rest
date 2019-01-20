const _ = require('lodash');
const Utils = require('./lib/Utils');
const SG = require('./lib/SG');
module.exports.run = (event, context, callback) => {
  const time = new Date();
  console.log(`Your function is getting executed @ ${time}`);
  var response = {};
  try {
    var payload = JSON.parse(event.body);
    //validate payload, must have key sgName and IP for the rule
    if (!_.has(payload, 'sgName') || !_.has(payload, 'IP')) {
      throw new Error(`POST JSON payload must have key 'sgName' and 'IP'`);
    }
    //validate the values
    if (!Utils.validateIP(payload.IP) || !Utils.validateSGName(payload.sgName)) {
      throw new Error(`POST JSON payload contains invalid 'IP' or 'sgName' values`);
    }
    //call the SG object to update the values
    let sgRules = [{ IP: payload.IP || payload.ip, port: 443 }, { IP: payload.IP || payload.ip, port: 80 }];
    SG.createOrupdateSGRule(payload.sgName, sgRules)
      .then((res) => {
        response = {
          statusCode: 200,
          body: JSON.stringify(res),
        };
        callback(null, response);
      })
      .catch((err) => {
        response = {
          statusCode: 500,
          body: JSON.stringify(err.message),
        };
        callback(null, response);
      })
  } catch (err) {
    // create a response
    response = {
      statusCode: 400,
      body: JSON.stringify(err.message),
    };
    callback(null, response);
  }
};