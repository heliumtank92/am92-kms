import crypto from 'crypto'
import NodeKmsError from './NodeKmsError.mjs'
import CONSTANTS from './CONSTANTS.mjs'
import ERRORS from './ERRORS.mjs'

const {
  VALID_KEY_SPECS,
  VALID_KEY_PAIR_SPECS,
  ENCRYPTION_ALGO,
  MASTER_KEY_LENGTH,
  MASTER_IV_LENGTH
} = CONSTANTS

const {
  INVALID_KEY_SPEC,
  INVALID_KEY_PAIR_SPEC,
  INVALD_MASTER_KEY_HEX,
  INVALID_MASTER_IV_HEX
} = ERRORS

export default class NodeKms {
  constructor (config = {}) {
    const derivedConfig = deriveConfig(config)
    this.config = { ...config, ...derivedConfig }

    this.generateDataKey = this.generateDataKey.bind(this)
    this.generateDataKeyPair = this.generateDataKeyPair.bind(this)
    this.encrypt = this.encrypt.bind(this)
    this.decrypt = this.decrypt.bind(this)
  }

  async generateDataKey () {
    try {
      const { KEY_ALGO, KEY_LENGTH, KEY_FORMAT } = this.config
      const options = { length: KEY_LENGTH }
      const keyObject = crypto.generateKeySync(KEY_ALGO, options)
      const dataKey = keyObject.export().toString(KEY_FORMAT)

      const encryptOptions = {
        cipherTextFormat: KEY_FORMAT,
        plainTextFormat: KEY_FORMAT
      }
      const encryptedDataKey = await this.encrypt(dataKey, encryptOptions)

      return { dataKey, encryptedDataKey }
    } catch (error) {
      const errorCode = `NodeKms::${error.code}`
      throw new NodeKmsError(error, { errorCode })
    }
  }

  async generateDataKeyPair () {
    try {
      const { KEY_PAIR_ALGO, KEY_PAIR_LENGTH, KEY_FORMAT } = this.config
      const options = { modulusLength: KEY_PAIR_LENGTH }
      let { privateKey, publicKey } = crypto.generateKeyPairSync(KEY_PAIR_ALGO, options)
      privateKey = privateKey.export().toString(KEY_FORMAT)
      publicKey = publicKey.export().toString(KEY_FORMAT)

      const encryptOptions = {
        cipherTextFormat: KEY_FORMAT,
        plainTextFormat: KEY_FORMAT
      }
      const encryptedPrivateKey = await this.encrypt(privateKey, encryptOptions)
      return { privateKey, publicKey, encryptedPrivateKey }
    } catch (error) {
      const errorCode = `NodeKms::${error.code}`
      throw new NodeKmsError(error, { errorCode })
    }
  }

  async encrypt (plainText = '', options = {}) {
    const {
      MASTER_KEY_BUFFER,
      MASTER_IV_BUFFER,
      CIPHER_TEXT_FORMAT,
      PLAIN_TEXT_FORMAT
    } = this.config

    const {
      cipherTextFormat = CIPHER_TEXT_FORMAT,
      plainTextFormat = PLAIN_TEXT_FORMAT
    } = options

    try {
      const encryptor = crypto.createCipheriv(ENCRYPTION_ALGO, MASTER_KEY_BUFFER, MASTER_IV_BUFFER)
      const cipherTextBuffer = Buffer.concat([encryptor.update(plainText, plainTextFormat), encryptor.final()])
      const cipherText = cipherTextBuffer.toString(cipherTextFormat)
      return cipherText
    } catch (error) {
      const errorCode = `NodeKms::${error.code}`
      throw new NodeKmsError(error, { errorCode })
    }
  }

  async decrypt (ciphertext = '', options = {}) {
    const {
      MASTER_KEY_HEX,
      MASTER_IV_HEX,
      CIPHER_TEXT_FORMAT,
      PLAIN_TEXT_FORMAT
    } = this.config

    const {
      cipherTextFormat = CIPHER_TEXT_FORMAT,
      plainTextFormat = PLAIN_TEXT_FORMAT
    } = options

    const keyBuffer = Buffer.from(MASTER_KEY_HEX, 'hex')
    const ivBuffer = Buffer.from(MASTER_IV_HEX, 'hex')
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
}

function deriveConfig (config) {
  const { KEY_SPEC, KEY_PAIR_SPEC, MASTER_KEY_HEX, MASTER_IV_HEX } = config

  if (!VALID_KEY_SPECS.includes(KEY_SPEC)) {
    throw new NodeKmsError({ KEY_SPEC }, INVALID_KEY_SPEC)
  }

  if (!VALID_KEY_PAIR_SPECS.includes(KEY_PAIR_SPEC)) {
    throw new NodeKmsError({ KEY_PAIR_SPEC }, INVALID_KEY_PAIR_SPEC)
  }

  const keySpecArray = KEY_SPEC.split('_')
  const KEY_ALGO = keySpecArray[0].toLowerCase()
  const KEY_LENGTH = parseInt(keySpecArray[1], 10)

  const keyPairSpecArray = KEY_PAIR_SPEC.split('_')
  const KEY_PAIR_ALGO = keyPairSpecArray[0].toLowerCase()
  const KEY_PAIR_LENGTH = parseInt(keyPairSpecArray[1], 10)

  const MASTER_KEY_BUFFER = Buffer.from(MASTER_KEY_HEX, 'hex')
  const MASTER_IV_BUFFER = Buffer.from(MASTER_IV_HEX, 'hex')

  if (MASTER_KEY_BUFFER.length !== MASTER_KEY_LENGTH) {
    throw new NodeKmsError({ MASTER_KEY_HEX }, INVALD_MASTER_KEY_HEX)
  }

  if (MASTER_IV_BUFFER.length !== MASTER_IV_LENGTH) {
    throw new NodeKmsError({ MASTER_IV_HEX }, INVALID_MASTER_IV_HEX)
  }

  return {
    KEY_ALGO,
    KEY_LENGTH,
    KEY_PAIR_ALGO,
    KEY_PAIR_LENGTH,
    MASTER_KEY_BUFFER,
    MASTER_IV_BUFFER
  }
}
