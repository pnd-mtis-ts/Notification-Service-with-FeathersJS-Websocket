// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  teleDataValidator,
  telePatchValidator,
  teleQueryValidator,
  teleResolver,
  teleExternalResolver,
  teleDataResolver,
  telePatchResolver,
  teleQueryResolver
} from './tele.schema.js'
import { TeleService, getOptions } from './tele.class.js'

export const telePath = 'tele'
export const teleMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './tele.class.js'
export * from './tele.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const tele = (app) => {
  // Register our service on the Feathers application
  app.use(telePath, new TeleService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: teleMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(telePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(teleExternalResolver), schemaHooks.resolveResult(teleResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(teleQueryValidator), schemaHooks.resolveQuery(teleQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(teleDataValidator), schemaHooks.resolveData(teleDataResolver)],
      patch: [schemaHooks.validateData(telePatchValidator), schemaHooks.resolveData(telePatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
