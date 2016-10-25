var express = require('express');
var os = require('os');
const database = 'trend-sensor';
const Influx = require('influx');
const influx = new Influx.InfluxDB({
 host: 'localhost',
 database: database,
 schema: [
   {
     measurement: 'sensors',
     fields: {
       temperature: Influx.FieldType.FLOAT,
       humidity: Influx.FieldType.FLOAT,
       pm1: Influx.FieldType.FLOAT,
       pm2_5: Influx.FieldType.FLOAT,
       pm10: Influx.FieldType.FLOAT,
       building: Influx.FieldType.STRING,
       area: Influx.FieldType.STRING,
       floor: Influx.FieldType.STRING,
       ip: Influx.FieldType.STRING
     },
     tags: [
       'mac'
     ]
   }
 ]
});
influx.createDatabase(database);

var router = express.Router();

/* GET users listing. */
router.get('/all', function(req, res, next) {
  res.send('list down all sensors');
});

router.post('/report', function(req, res, next) {
  //body = {"temperature":24, "humidity": 45, "building":"B", "floor": "3", "area":"A", "pm1": 1, "pm2_5": 2, "pm10": 3, "mac": "b8:27:eb:20:6c:1c", "ip": "10.1.201.195"};
  req.body;
  body = {};
  body['temperature'] = parseFloat(req.body.temperature);
  body['humidity'] = parseFloat(req.body.humidity);
  body['pm1'] = parseFloat(req.body.pm1);
  body['pm2_5'] = parseFloat(req.body.pm2_5);
  body['pm10'] = parseFloat(req.body.pm10);
  body['building'] = req.body.building;
  body['floor'] = req.body.floor;
  body['area'] = req.body.area;
  body['ip'] = req.body.ip;
  mac = req.body.mac;
  delete body.mac;
  console.log({
      measurement: 'sensors',
      tags: { mac: mac },
      fields: body
    });
  influx.writePoints([
    {
      measurement: 'sensors',
      tags: { mac: mac },
      fields: body
    }
  ]).then(()=> {
    res.send('OK');
  }).catch((error) => {
    console.log(error);
    res.send(error);
  });

});

module.exports = router;
