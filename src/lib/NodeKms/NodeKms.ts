import crypto from 'crypto'
import NodeKmsError from './NodeKmsError'
import {
  VALID_KEY_SPECS,
  VALID_KEY_PAIR_SPECS,
  ENCRYPTION_ALGO,
  MASTER_KEY_LENGTH,
  MASTER_IV_LENGTH,
  PRIVATE_KEY_EXPORT_OPTIONS,
  PUBLIC_KEY_EXPORT_OPTIONS
} from './CONSTANTS'

import {
  INVALID_CONFIG_ERROR,
  INVALID_KEY_SPEC_ERROR,
  INVALID_KEY_PAIR_SPEC_ERROR,
  INVALD_MASTER_KEY_HEX_ERROR,
  INVALID_MASTER_IV_HEX_ERROR
} from './ERRORS'
import {
  DataKeyObject,
  DataKeyPairObject,
  EncryptDecryptOptions,
  NodeKmsConfig,
  NodeKmsExtendedConfig
} from '../../TYPES'

export default class NodeKms {
  CONFIG: NodeKmsExtendedConfig

  constructor(config: NodeKmsConfig) {
    this.CONFIG = validateConfigAndExtend(config)

    this.generateDataKey = this.generateDataKey.bind(this)
    this.generateDataKeyPair = this.generateDataKeyPair.bind(this)
    this.encrypt = this.encrypt.bind(this)
    this.decrypt = this.decrypt.bind(this)
  }

  async generateDataKey() {
    try {
      const { KEY_ALGO, KEY_LENGTH, KEY_FORMAT } = this.CONFIG
      const options = { length: KEY_LENGTH }
      const keyObject = crypto.generateKeySync(KEY_ALGO, options)
      const dataKey = keyObject.export().toString(KEY_FORMAT)

      const encryptOptions = {
        cipherTextFormat: KEY_FORMAT,
        plainTextFormat: KEY_FORMAT
      }
      const encryptedDataKey = await this.encrypt(dataKey, encryptOptions)

      const dataKeyObject: DataKeyObject = { dataKey, encryptedDataKey }
      return dataKeyObject
    } catch (error: any) {
      const errorCode = `NodeKms::${error.code}`
      throw new NodeKmsError(error, { errorCode })
    }
  }

  async generateDataKeyPair() {
    try {
      const { KEY_PAIR_ALGO, KEY_PAIR_LENGTH, KEY_FORMAT } = this.CONFIG
      const options = { modulusLength: KEY_PAIR_LENGTH }
      const keyObjects = crypto.generateKeyPairSync(KEY_PAIR_ALGO, options)
      const privateKey = keyObjects.privateKey
        .export(PRIVATE_KEY_EXPORT_OPTIONS)
        .toString(KEY_FORMAT)
      const publicKey = keyObjects.publicKey
        .export(PUBLIC_KEY_EXPORT_OPTIONS)
        .toString(KEY_FORMAT)

      const encryptOptions = {
        cipherTextFormat: KEY_FORMAT,
        plainTextFormat: KEY_FORMAT
      }
      const encryptedPrivateKey = await this.encrypt(privateKey, encryptOptions)
      const dataKeyPairObject: DataKeyPairObject = {
        privateKey,
        publicKey,
        encryptedPrivateKey
      }
      return dataKeyPairObject
    } catch (error: any) {
      const errorCode = `NodeKms::${error.code}`
      throw new NodeKmsError(error, { errorCode })
    }
  }

  async encrypt(
    plainText: string = '',
    options: EncryptDecryptOptions = {}
  ): Promise<string> {
    const {
      MASTER_KEY_BUFFER,
      MASTER_IV_BUFFER,
      CIPHER_TEXT_FORMAT,
      PLAIN_TEXT_FORMAT
    } = this.CONFIG

    const {
      cipherTextFormat = CIPHER_TEXT_FORMAT,
      plainTextFormat = PLAIN_TEXT_FORMAT
    } = options

    try {
      const encryptor = crypto.createCipheriv(
        ENCRYPTION_ALGO,
        MASTER_KEY_BUFFER,
        MASTER_IV_BUFFER
      )
      const cipherTextBuffer = Buffer.concat([
        encryptor.update(plainText, plainTextFormat),
        encryptor.final()
      ])
      const cipherText = cipherTextBuffer.toString(cipherTextFormat)
      return cipherText
    } catch (error: any) {
      const errorCode = `NodeKms::${error.code}`
      throw new NodeKmsError(error, { errorCode })
    }
  }

  async decrypt(
    ciphertext: string = '',
    options: EncryptDecryptOptions = {}
  ): Promise<string> {
    const {
      MASTER_KEY_HEX,
      MASTER_IV_HEX,
      CIPHER_TEXT_FORMAT,
      PLAIN_TEXT_FORMAT
    } = this.CONFIG

    const {
      cipherTextFormat = CIPHER_TEXT_FORMAT,
      plainTextFormat = PLAIN_TEXT_FORMAT
    } = options

    const keyBuffer = Buffer.from(MASTER_KEY_HEX, 'hex')
    const ivBuffer = Buffer.from(MASTER_IV_HEX, 'hex')
    const cipherTextBuffer = Buffer.from(ciphertext, cipherTextFormat)

    try {
      const decryptor = crypto.createDecipheriv(
        ENCRYPTION_ALGO,
        keyBuffer,
        ivBuffer
      )
      const plainTextBuffer = Buffer.concat([
        decryptor.update(cipherTextBuffer),
        decryptor.final()
      ])
      const plainText = plainTextBuffer.toString(plainTextFormat)
      return plainText
    } catch (error: any) {
      const errorCode = `NodeKms::${error.code}`
      throw new NodeKmsError(error, { errorCode })
    }
  }
}

function validateConfigAndExtend(config: NodeKmsConfig): NodeKmsExtendedConfig {
  const { KEY_SPEC, KEY_PAIR_SPEC, MASTER_KEY_HEX, MASTER_IV_HEX } = config

  if (!MASTER_KEY_HEX) {
    throw new NodeKmsError(config, INVALID_CONFIG_ERROR)
  }

  if (!VALID_KEY_SPECS.includes(KEY_SPEC)) {
    throw new NodeKmsError({ KEY_SPEC }, INVALID_KEY_SPEC_ERROR)
  }

  if (!VALID_KEY_PAIR_SPECS.includes(KEY_PAIR_SPEC)) {
    throw new NodeKmsError({ KEY_PAIR_SPEC }, INVALID_KEY_PAIR_SPEC_ERROR)
  }

  const keySpecArray = KEY_SPEC.split('_')
  const KEY_ALGO = 'aes'
  // TODO: const KEY_ALGO = keySpecArray[0].toLowerCase()
  const KEY_LENGTH = parseInt(keySpecArray[1], 10)

  const keyPairSpecArray = KEY_PAIR_SPEC.split('_')
  const KEY_PAIR_ALGO = 'rsa'
  // TODO: const KEY_PAIR_ALGO = keyPairSpecArray[0].toLowerCase()
  const KEY_PAIR_LENGTH = parseInt(keyPairSpecArray[1], 10)

  const MASTER_KEY_BUFFER = Buffer.from(MASTER_KEY_HEX, 'hex')
  const MASTER_IV_BUFFER = Buffer.from(MASTER_IV_HEX, 'hex')

  if (MASTER_KEY_BUFFER.length !== MASTER_KEY_LENGTH) {
    throw new NodeKmsError({ MASTER_KEY_HEX }, INVALD_MASTER_KEY_HEX_ERROR)
  }

  if (MASTER_IV_BUFFER.length !== MASTER_IV_LENGTH) {
    throw new NodeKmsError({ MASTER_IV_HEX }, INVALID_MASTER_IV_HEX_ERROR)
  }

  const extendedConfig: NodeKmsExtendedConfig = {
    ...config,
    KEY_ALGO,
    KEY_LENGTH,
    KEY_PAIR_ALGO,
    KEY_PAIR_LENGTH,
    MASTER_KEY_BUFFER,
    MASTER_IV_BUFFER
  }

  return extendedConfig
}
