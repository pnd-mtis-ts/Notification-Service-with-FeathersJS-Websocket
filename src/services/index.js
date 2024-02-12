import { tele } from './tele/tele.js'

export const services = (app) => {
  app.configure(tele)

  // All services will be registered here
}
