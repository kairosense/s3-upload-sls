import crypto from 'crypto'

export const generateMD5 = (value: unknown) => {
  return crypto.createHash('md5').update(String(value)).digest('hex')
}

export const encodeBase64 = (value: unknown) => {
  return Buffer.from(String(value)).toString('base64')
}

export const decodeBase64 = (value: string) => {
  return Buffer.from(value, 'base64').toString('utf-8')
}

export const uuid = () => crypto.randomUUID()
