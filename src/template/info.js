import { readFile, stat } from 'node:fs/promises'
import { parser } from '../parser/parser.js'
import { buildTree } from '../parser/buildTree.js'
import { printTree } from '../parser/printTree.js'
import { getTemplatePath, validateName } from './utils.js'

export async function info(templateName) {
  validateName(templateName)
  const templatePath = getTemplatePath(templateName)

  const stats = await stat(templatePath)
  const content = await readFile(templatePath, 'utf8')

  const tokens = await parser(content, { strict: false })
  const tree = buildTree(tokens, { strict: false })

  console.log(`Name: ${templateName}`)
  console.log(`Path: ${templatePath}`)
  console.log(`Size: ${stats.size} bytes`)
  console.log(`Modified: ${stats.mtime.toISOString().split('T')[0]}`)

  printTree('Content:')(tree)
}
