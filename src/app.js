// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from '@feathersjs/koa'
import Router from 'koa-router';
import { configurationValidator } from './configuration.js'
import { logError } from './hooks/log-error.js'
import { postgresql } from './postgresql.js'

import { services } from './services/index.js'

const app = koa(feathers())

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator))

// Koa middleware 
app.use(cors())
app.use(serveStatic(app.get('public')))
app.use(errorHandler())
app.use(parseAuthentication())
app.use(bodyParser())

// Configure services and transports
app.configure(rest())
app.configure(postgresql)
app.configure(services)

// Create a new Koa router instance
const router = new Router();

// Define a route to handle POST requests
router.post('/api/send-data', async (ctx) => {
  try {
    const receivedData = ctx.request.body; // Assuming data is sent in the request body
    // Handle the received data, e.g., pass it to the TeleService create method
    const result = await teleService.create(receivedData);
    ctx.body = { success: true, result };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, error: error.message };
  }
}); 

// Use the Koa router as middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
