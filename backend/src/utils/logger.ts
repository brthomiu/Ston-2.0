/* eslint-disable import/no-extraneous-dependencies */
import logger from 'pino';
import dayjs from 'dayjs';

const level = 'info';

const log = logger({
  transport: {
    target: 'pino-pretty',
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"Time":"${dayjs().format()}"`,
});

export default log;
