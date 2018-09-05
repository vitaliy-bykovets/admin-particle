const moment                             = require('moment');
const {createLogger, format, transports} = require('winston'); // A logger for just about everything. https://github.com/winstonjs/winston

const { combine, timestamp, label, printf, colorize } = format; // https://github.com/winstonjs/winston#formats

const consoleTransport  = new transports.Console();
consoleTransport.silent = process.env.LOG_ENABLED !== 'true'; // If true, all logs are suppressed

const ct = ts => moment(ts).format('YYYY-MM-DD HH:mm'); // convert time

const loggerFormat = printf(info => `${ct(info.timestamp)} ${info.level} [${info.label}]: ${info.message}`);
const dbloggerFormat = printf(info => `${ct(info.timestamp)} ${info.level} ${info.message}`);

module.exports = module => {
  const path = module.filename.replace(process.cwd(), '').substr(1);
  return createLogger({
    level: 'verbose',
    format: combine(colorize(), label({label: path}), timestamp(), loggerFormat),
    transports: [consoleTransport]
  });
};

module.exports.dblogger = () => createLogger({
  level: 'verbose',
  format: combine(colorize(), label(), timestamp(), dbloggerFormat),
  transports: [consoleTransport]
});