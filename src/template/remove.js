import { rm } from 'node:fs/promises'
import { getTemplatePath, validateName } from './utils.js'

export async function remove(template) {
  validateName(template)
  const templatePath = getTemplatePath(template)
  await rm(templatePath, { force: true })
}
