import * as xss from 'xss'

const client = new xss.FilterXSS()

export const xssClean = (value: string) => {
  return client.process(value)
}
