import { cac } from 'cac'
import {
  build,
  addTemplate,
  removeTemplate,
  listTemplates,
  updateTemplate,
  infoTemplate,
} from './commands/index.js'
import { RootiError } from './errors/RootiError.js'

const cli = cac('rooti')

function handleErrors(action) {
  return async (...args) => {
    try {
      await action(...args)
    } catch (e) {
      const options = args.at(-1)
      if (e instanceof RootiError) {
        console.error(`Error: ${e.message}`)
        if (options?.verbose) {
          console.error(e.stack)
        }
      } else {
        console.error(`Error: ${e.message}`)
        console.error(e.stack)
      }
      process.exitCode = 1
    }
  }
}

cli
  .command(
    'build <template>',
    'Create a folder and file structure using a predefined template.',
  )
  .option('--verbose', 'Show detailed error information.')
  .option(
    '--no-strict',
    'It allows you to be more lax in terms of bleeding in the template structure.',
  )
  .option('--output <dir>', 'Allows you to select an exit route.')
  .action(
    handleErrors(async (template, options) => {
      await build(template, options)
    }),
  )

cli
  .command(
    'template <action> [...args]',
    'Manage custom .rooti templates.',
  )
  .option('--name <templateName>', 'Name for the template')
  .option('--verbose', 'Show detailed error information.')
  .action(
    handleErrors(async (action, args, options) => {
      switch (action) {
        case 'add':
          await addTemplate(args[0], options)
          break
        case 'remove':
          await removeTemplate(args[0])
          break
        case 'list':
          await listTemplates()
          break
        case 'info':
          await infoTemplate(args[0])
          break
        case 'update':
          await updateTemplate(args[0], args[1])
          break
        default:
          cli.outputHelp()
      }
    }),
  )

cli.help()

try {
  cli.parse()
} catch (e) {
  console.log(e.message)
}
