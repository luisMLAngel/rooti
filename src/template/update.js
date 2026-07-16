import { readFile, writeFile } from 'node:fs/promises'
import { getTemplatePath, validateName } from './utils.js'

export async function update(templateName, filePath) {
  validateName(templateName)

  if (!filePath) {
    throw new Error('It is required to enter the path of the new template file')
  }

  const content = await readFile(filePath, 'utf8')
  const templatePath = getTemplatePath(templateName)
  await writeFile(templatePath, content)
}
