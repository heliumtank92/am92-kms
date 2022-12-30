import {
  KMSClient,
  GenerateDataKeyCommand,
  GenerateDataKeyPairCommand,
  EncryptCommand,
  DecryptCommand
} from '@aws-sdk/client-kms'
import AwsKmsError from './AwsKmsError.mjs'

import {
  GENERATE_DATA_KEY_ERROR,
  GENERATE_DATA_KEY_PAIR_ERROR,
  ENCRYPT_ERROR,
  DECRYPT_ERROR
} from './ERRORS.mjs'

export default class AwsKms {
  constructor (config = {}) {
    this.config = config

    this.client = new KMSClient(this.config.AWS_CONNECTION_CONFIG)

    this.generateDataKey = this.generateDataKey.bind(this)
    this.generateDataKeyPair = this.generateDataKeyPair.bind(this)
    this.encrypt = this.encrypt.bind(this)
    this.decrypt = this.decrypt.bind(this)
  }

  async generateDataKey () {
    try {
      const { AWS_KEY_ID, KEY_SPEC, KEY_FORMAT } = this.config
      const params = { KeyId: AWS_KEY_ID, KeySpec: KEY_SPEC }
      const command = new GenerateDataKeyCommand(params)
      const response = await this.client.send(command)

      const { CiphertextBlob, Plaintext } = response
      const encryptedDataKey = Buffer.from(CiphertextBlob).toString(KEY_FORMAT)
      const dataKey = Buffer.from(Plaintext).toString(KEY_FORMAT)

      return { dataKey, encryptedDataKey }
    } catch (error) {
      throw new AwsKmsError(error, GENERATE_DATA_KEY_ERROR)
    }
  }

  async generateDataKeyPair () {
    try {
      const { AWS_KEY_ID, KEY_PAIR_SPEC, KEY_FORMAT } = this.config
      const params = { KeyId: AWS_KEY_ID, KeyPairSpec: KEY_PAIR_SPEC }
      const command = new GenerateDataKeyPairCommand(params)
      const response = await this.client.send(command)

      const {
        PrivateKeyCiphertextBlob,
        PrivateKeyPlaintext,
        PublicKey
      } = response
      const encryptedPrivateKey = Buffer.from(PrivateKeyCiphertextBlob).toString(KEY_FORMAT)
      const privateKey = Buffer.from(PrivateKeyPlaintext).toString(KEY_FORMAT)
      const publicKey = Buffer.from(PublicKey).toString(KEY_FORMAT)

      const data = { privateKey, publicKey, encryptedPrivateKey }
      return data
    } catch (error) {
      throw new AwsKmsError(error, GENERATE_DATA_KEY_PAIR_ERROR)
    }
  }

  async encrypt (Plaintext = '', options = {}) {
    try {
      const { AWS_KEY_ID, CIPHER_TEXT_FORMAT } = this.config
      const { cipherTextFormat = CIPHER_TEXT_FORMAT } = options
      const params = { KeyId: AWS_KEY_ID, Plaintext }
      const command = new EncryptCommand(params)
      const response = await this.client.send(command)

      const { CiphertextBlob } = response
      const ciphertext = Buffer.from(CiphertextBlob).toString(cipherTextFormat)

      return ciphertext
    } catch (error) {
      throw new AwsKmsError(error, ENCRYPT_ERROR)
    }
  }

  async decrypt (Ciphertext = '', options = {}) {
    try {
      const { AWS_KEY_ID, CIPHER_TEXT_FORMAT, PLAIN_TEXT_FORMAT } = this.config
      const {
        cipherTextFormat = CIPHER_TEXT_FORMAT,
        plainTextFormat = PLAIN_TEXT_FORMAT
      } = options
      const CiphertextBlob = Buffer.from(Ciphertext, cipherTextFormat)

      const params = { KeyId: AWS_KEY_ID, CiphertextBlob }
      const command = new DecryptCommand(params)
      const response = await this.client.send(command)

      const { Plaintext } = response
      const plaintext = Buffer.from(Plaintext).toString(plainTextFormat)

      return plaintext
    } catch (error) {
      throw new AwsKmsError(error, DECRYPT_ERROR)
    }
  }
}
