var express = require('express');

var influx = require('influx');
client = influx({
  hosts: ['http://127.0.0.1'],
  username: 'root',
  password: 'root',
  database: 'trend-sensor'
});

var router = express.Router();

/* GET users listing. */
router.get('/all', function(req, res, next) {
  res.send('list down all sensors');
});

router.post('/report', function(req, res, next) {
  console.log(req.body);
  res.send('OK');
});

module.exports = router;
