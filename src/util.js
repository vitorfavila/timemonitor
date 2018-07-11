var moment = require('moment');

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
  formatUptime: function(uptime) {
    const duration = moment.duration(uptime, 'seconds');
    const result = {
        seconds: uptime,
        minutes: duration.minutes(),
        hours: duration.hours(),
        days: duration.days(),
        string: duration.days() + ' days, ' + duration.hours() + ' hours, ' + duration.minutes() + ' minutes and ' + duration.seconds() + ' seconds' ,
        unix: moment.unix(uptime),
    };
    return result;
  },
  formatUptimeString: function(uptime) {
    return new Date(Date.now() - uptime);
  }
};
