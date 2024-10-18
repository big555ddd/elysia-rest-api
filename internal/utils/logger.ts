import pino from 'pino';

const setupLogger = () => {
  return pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    level: process.env.DEBUG === 'true' ? 'debug' : 'info',
  });
};

export default setupLogger;
