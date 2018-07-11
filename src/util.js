var moment = require('moment');
const { execSync } = require('child_process');

module.exports = {
  toGb: function (value) {
    return (value / (1024 * 1024 * 1024)).toFixed(1);
  },
  toMb: function (value) {
    return (value / (1024 * 1024)).toFixed(1);
  },
  formatCpuUsage: function(usage) {
    let formatted = {
        usage1minute: usage[0].toFixed(2),
        usage5minutes: usage[1].toFixed(2),
        usage15minutes: usage[1].toFixed(2),
    };

    return formatted;
  },
  formatUptime: function() {
    let uptime = execSync("uptime | awk -F' ' ' { print $3 \" \" $5} ' | sed 's/:/ /' | sed 's/,//'", function (error, stdout, stderr) {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      return stdout;
    }).toString().replace(/\n$/, '');

    // const duration = moment.duration(uptime, 'seconds');
    const result = {
        seconds: uptime,
        minutes: uptime.split(' ')[2],
        hours: uptime.split(' ')[1],
        days: uptime.split(' ')[0],
        string: uptime.split(' ')[0] + ' days, ' + uptime.split(' ')[1] + ' hours and ' + uptime.split(' ')[2] + ' minutes' ,
    };
    return result;
  },
  formatUptimeString: function(uptime) {
    return new Date(Date.now() - uptime);
  }
};
