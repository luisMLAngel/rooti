import { fileURLToPath } from 'node:url'
import { parser } from '../parser/parser.js'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { buildTree } from '../parser/buildTree.js'
import { generate } from '../parser/generate.js'
import { TemplateNotFoundError } from '../errors/RootiError.js'
import { printTree } from '../parser/printTree.js'
import { INNER_TEMPLATES } from '../config/config.js'
import { getTemplatePath } from '../template/utils.js'

export async function build(template, options) {
  const existsInner = INNER_TEMPLATES.some(
    (t) => t.toLowerCase() === template.toLowerCase(),
  )

  let contentFile
  if (existsInner) {
    contentFile = await chooseTemplate(template)
  } else {
    contentFile = await openCustomOrFile(template)
  }

  const tokens = await parser(contentFile, options)
  const tree = buildTree(tokens, options)
  const outDirectory = options.output
    ? join(process.cwd(), options.output)
    : process.cwd()
  await generate(tree, outDirectory)
  printTree('Structure generated correctly!')(tree)
}

async function openCustomOrFile(template) {
  const customPath = getTemplatePath(template)
  try {
    return await readFile(customPath, 'utf8')
  } catch {
    return await openFile(template)
  }
}

async function chooseTemplate(template) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  switch (template.toLowerCase()) {
    case 'angular':
      return await readFile(
        join(__dirname, '../templates/angular.rooti'),
        'utf8',
      )
    case 'nodejs':
      return await readFile(
        join(__dirname, '../templates/nodejs.rooti'),
        'utf8',
      )
    case 'nest':
      return await readFile(join(__dirname, '../templates/nest.rooti'), 'utf8')
    case 'vue':
      return await readFile(join(__dirname, '../templates/vue.rooti'), 'utf8')
    default:
      return await readFile(
        join(__dirname, '../templates/default.rooti'),
        'utf8',
      )
  }
}

async function openFile(file) {
  try {
    return await readFile(file, 'utf8')
  } catch {
    throw new TemplateNotFoundError(file)
  }
}
