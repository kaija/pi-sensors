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
       floor: Influx.FieldType.STRING
     },
     tags: [
       'host'
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
  console.log(req.body);
  body = {"temperature":24, "humidity": 45, "building":"B", "floor": "3", "area":"A", "pm1": 1, "pm2_5": 2, "pm10": 3};
  influx.writePoints([
    {
      measurement: 'sensors',
      tags: { host: os.hostname() },
      fields: body
    }
  ]).then(()=> {
    res.send('OK');
  }).catch((error) => {
    res.send(error);
  });
});

module.exports = router;
