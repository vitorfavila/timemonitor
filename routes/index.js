var express = require('express');
var router = express.Router();
var util = require('../src/util');
var SendMail = require('../src/SendMail');

const disk = require('diskusage');
const os = require('os');

let diskpath = os.platform() === 'win32' ? 'c:' : '/';

/* GET home page. */
// router.get('/', function(req, res, next) {

//   disk.check(diskpath, function(err, info) {
//     if (err) {
//         console.log(err);
//     } else {
//         res.send(info);
//     }
//   });

// });

// router.get('/cpu', function(req, res, next) {

//   const avg = os.loadavg();
//   // console.log(util.formatCpuUsage(avg));
//   res.send(util.formatCpuUsage(avg));

// });

router.get('/', function(req, res, next) {

  let diskData = {};
  disk.check(diskpath, function(err, info) {
    if (err) {
        console.log(err);
    } else {
      diskData = {
        raw: info,
        available: util.toGb(info.available),
        percentAvailable: ((info.available / info.total) * 100).toFixed(2),
        total: util.toGb(info.total),
      };
    }
  });

  const general = {
    hostname: os.hostname(),
    disk: diskData,
    platform: os.platform(),
    uptime: util.formatUptime(),
    cpus: {usage: util.formatCpuUsage(os.loadavg()), cpus: os.cpus()},
    freememory: util.toMb(os.freemem()),
    networking: os.networkInterfaces(),
  };

  // let mail = new SendMail();
  // mail.send(general.hostname, '<h3>Test</h3>');

  res.send(general);

});

module.exports = router;
