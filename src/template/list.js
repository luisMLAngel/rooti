import { readdir } from 'node:fs/promises'
import { parse } from 'node:path'
import { getTemplatesDir } from './utils.js'

export async function list() {
  const templatesDir = getTemplatesDir()
  const files = await readdir(templatesDir)
  for (const file of files) {
    console.log(`✓ ${parse(file).name}`)
  }
}
