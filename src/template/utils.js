import { homedir } from 'node:os'
import { join } from 'node:path'
import { TemplateNameIsRequiredError } from '../errors/RootiError.js'

export function getTemplatesDir() {
  return join(homedir(), '.rooti', 'templates')
}

export function getTemplatePath(name) {
  return join(getTemplatesDir(), `${name}.rooti`)
}

export function validateName(name) {
  if (!name) {
    throw new TemplateNameIsRequiredError(
      'It is required to enter the name of the template',
    )
  }
}
