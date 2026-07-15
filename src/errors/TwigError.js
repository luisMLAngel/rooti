export class TwigError extends Error {
  constructor(message, code) {
    super(message)
    this.name = this.constructor.name
    this.code = code
  }
}

export class TemplateNotFoundError extends TwigError {
  constructor(template) {
    super(`Template file not found: "${template}"`, 'TEMPLATE_NOT_FOUND')
  }
}

export class InvalidOptionsError extends TwigError {
  constructor(message) {
    super(message, 'INVALID_OPTIONS')
  }
}

export class ParserTemplateError extends TwigError {
  constructor(message) {
    super(message, 'PARSER_TEMPLATE_ERROR')
  }
}
