import crypto from 'crypto'
import CONFIG from '../../CONFIG.mjs'
import NodeKmsError from './NodeKmsError.mjs'

const {
  KEY_PAIR_ALGO,
  KEY_PAIR_LENGTH,
  KEY_ALGO,
  KEY_LENGTH,
  KEY_FORMAT,
  PLAIN_TEXT_FORMAT,
  CIPHER_TEXT_FORMAT,

  NODE_MASTER_KEY,
  NODE_MASTER_IV_HEX
} = CONFIG

const ENCRYPTION_ALGO = 'aes-256-cbc'

const NodeKms = {
  generateDataKey,
  generateDataKeyPair,
  encrypt,
  decrypt
}

export default NodeKms

async function generateDataKey () {
  try {
    const options = { length: KEY_LENGTH }
    const keyObject = crypto.generateKeySync(KEY_ALGO, options)
    const dataKey = keyObject.export().toString(KEY_FORMAT)

    const encryptOptions = {
      cipherTextFormat: KEY_FORMAT,
      plainTextFormat: KEY_FORMAT
    }
    const encryptedDataKey = await encrypt(dataKey, encryptOptions)

    return { dataKey, encryptedDataKey }
  } catch (error) {
    const errorCode = `NodeKms::${error.code}`
    throw new NodeKmsError(error, { errorCode })
  }
}
async function generateDataKeyPair () {
  try {
    const options = { modulusLength: KEY_PAIR_LENGTH }
    let { privateKey, publicKey } = crypto.generateKeyPairSync(KEY_PAIR_ALGO, options)
    privateKey = privateKey.export().toString(KEY_FORMAT)
    publicKey = publicKey.export().toString(KEY_FORMAT)

    const encryptOptions = {
      cipherTextFormat: KEY_FORMAT,
      plainTextFormat: KEY_FORMAT
    }
    const encryptedPrivateKey = await encrypt(privateKey, encryptOptions)
    return { privateKey, publicKey, encryptedPrivateKey }
  } catch (error) {
    const errorCode = `NodeKms::${error.code}`
    throw new NodeKmsError(error, { errorCode })
  }
}

async function encrypt (plainText = '', options = {}) {
  const {
    cipherTextFormat = CIPHER_TEXT_FORMAT,
    plainTextFormat = PLAIN_TEXT_FORMAT
  } = options

  const keyBuffer = Buffer.from(NODE_MASTER_KEY, KEY_FORMAT)
  const ivBuffer = Buffer.from(NODE_MASTER_IV_HEX, 'hex')

  try {
    const encryptor = crypto.createCipheriv(ENCRYPTION_ALGO, keyBuffer, ivBuffer)
    const cipherTextBuffer = Buffer.concat([encryptor.update(plainText, plainTextFormat), encryptor.final()])
    const cipherText = cipherTextBuffer.toString(cipherTextFormat)
    return cipherText
  } catch (error) {
    const errorCode = `NodeKms::${error.code}`
    throw new NodeKmsError(error, { errorCode })
  }
}

async function decrypt (ciphertext = '', options = {}) {
  const {
    cipherTextFormat = CIPHER_TEXT_FORMAT,
    plainTextFormat = PLAIN_TEXT_FORMAT
  } = options

  const keyBuffer = Buffer.from(NODE_MASTER_KEY, KEY_FORMAT)
  const ivBuffer = Buffer.from(NODE_MASTER_IV_HEX, 'hex')
  const cipherTextBuffer = Buffer.from(ciphertext, cipherTextFormat)

  try {
    const decryptor = crypto.createDecipheriv(ENCRYPTION_ALGO, keyBuffer, ivBuffer)
    const plainTextBuffer = Buffer.concat([decryptor.update(cipherTextBuffer), decryptor.final()])
    const plainText = plainTextBuffer.toString(plainTextFormat)
    return plainText
  } catch (error) {
    const errorCode = `NodeKms::${error.code}`
    throw new NodeKmsError(error, { errorCode })
  }
}
