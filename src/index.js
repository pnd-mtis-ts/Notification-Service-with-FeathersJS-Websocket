import { app } from './app.js';
import { logger } from './logger.js';
import { TeleService } from './services/tele/tele.class.js'; // Import your TeleService create method

const port = app.get('port');
const host = app.get('host');
const teleService = new TeleService({});
console.log('TeleService instance:', teleService);

// Handle unhandled rejections
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection %O', reason);
});

// Make the teleService instance available globally
global.teleService = teleService;

// Middle
app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/api/send-data') {
    try {
      const receivedData = ctx.request.body; 
      const result = await global.teleService.create(receivedData);
      ctx.body = { success: true, result };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  } else {
    await next();
  }
});

// Start the Feathers.js app with Koa
app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`);
});
