// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const teleSchema = Type.Object(
  {
    id: Type.Number(),
    temperature: Type.Number(),
    humidity: Type.Number(),
    isExceeded: Type.Boolean()
  },
  { $id: 'Tele', additionalProperties: false }
)

export const teleValidator = getValidator(teleSchema, dataValidator)

export const teleResolver = resolve({})
export const teleExternalResolver = resolve({})

// Schema for creating new entries
export const teleDataSchema = Type.Pick(teleSchema, ['temperature', 'humidity', 'isExceeded'], {
  $id: 'TeleData'
})
export const teleDataValidator = getValidator(teleDataSchema, dataValidator)
export const teleDataResolver = resolve({})

// Schema for updating existing entries
export const telePatchSchema = Type.Partial(teleSchema, {
  $id: 'TelePatch'
})
export const telePatchValidator = getValidator(telePatchSchema, dataValidator)
export const telePatchResolver = resolve({})

// Schema for allowed query properties
export const teleQueryProperties = Type.Pick(teleSchema, ['id', 'temperature', 'humidity', 'isExceeded'])
export const teleQuerySchema = Type.Intersect(
  [
    querySyntax(teleQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const teleQueryValidator = getValidator(teleQuerySchema, queryValidator)
export const teleQueryResolver = resolve({})
