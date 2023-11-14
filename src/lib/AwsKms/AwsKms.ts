import {
  KMSClient,
  GenerateDataKeyCommand,
  GenerateDataKeyPairCommand,
  EncryptCommand,
  DecryptCommand,
  EncryptCommandInput,
  DecryptCommandInput,
  GenerateDataKeyCommandInput,
  GenerateDataKeyPairCommandInput
} from '@aws-sdk/client-kms'
import AwsKmsError from './AwsKmsError'

import {
  INVALID_CONFIG_ERROR,
  GENERATE_DATA_KEY_ERROR,
  GENERATE_DATA_KEY_PAIR_ERROR,
  ENCRYPT_ERROR,
  DECRYPT_ERROR
} from './ERRORS'
import {
  AwsKmsConfig,
  DataKeyObject,
  DataKeyPairObject,
  EncryptDecryptOptions
} from '../../TYPES'

/**
 * Class to execute KMS methods using AWS KMS
 *
 * @class
 */
export default class AwsKms {
  /**
   * Configurations used for AWS KMS
   */
  CONFIG: AwsKmsConfig
  /**
   * AWS KMS client instance
   */
  client: KMSClient

  /**
   * Creates an instance of AwsKms.
   *
   * @constructor
   * @param config
   */
  constructor(config: AwsKmsConfig) {
    this.CONFIG = validateConfig(config)
    this.client = new KMSClient(this.CONFIG.AWS_CONNECTION_CONFIG)

    this.generateDataKey = this.generateDataKey.bind(this)
    this.generateDataKeyPair = this.generateDataKeyPair.bind(this)
    this.encrypt = this.encrypt.bind(this)
    this.decrypt = this.decrypt.bind(this)
  }

  /**
   * Generates encryption keys for symmetric encryption algorithm
   *
   * @async
   * @returns
   */
  async generateDataKey(): Promise<DataKeyObject> {
    try {
      const { AWS_KEY_ID, KEY_SPEC, KEY_FORMAT } = this.CONFIG
      const params: GenerateDataKeyCommandInput = {
        KeyId: AWS_KEY_ID,
        KeySpec: KEY_SPEC
      }
      const command = new GenerateDataKeyCommand(params)
      const response = await this.client.send(command)

      const { CiphertextBlob, Plaintext } = response
      const encryptedDataKey = Buffer.from(CiphertextBlob || []).toString(
        KEY_FORMAT
      )
      const dataKey = Buffer.from(Plaintext || []).toString(KEY_FORMAT)

      const dataKeyObject: DataKeyObject = { dataKey, encryptedDataKey }
      return dataKeyObject
    } catch (error) {
      throw new AwsKmsError(error, GENERATE_DATA_KEY_ERROR)
    }
  }

  /**
   * Generates encryption keys for asymmetric encryption algorithm
   *
   * @async
   * @returns
   */
  async generateDataKeyPair(): Promise<DataKeyPairObject> {
    try {
      const { AWS_KEY_ID, KEY_PAIR_SPEC, KEY_FORMAT } = this.CONFIG
      const params: GenerateDataKeyPairCommandInput = {
        KeyId: AWS_KEY_ID,
        KeyPairSpec: KEY_PAIR_SPEC
      }
      const command = new GenerateDataKeyPairCommand(params)
      const response = await this.client.send(command)

      const { PrivateKeyCiphertextBlob, PrivateKeyPlaintext, PublicKey } =
        response
      const encryptedPrivateKey = Buffer.from(
        PrivateKeyCiphertextBlob || []
      ).toString(KEY_FORMAT)
      const privateKey = Buffer.from(PrivateKeyPlaintext || []).toString(
        KEY_FORMAT
      )
      const publicKey = Buffer.from(PublicKey || []).toString(KEY_FORMAT)

      const dataKeyPairObject: DataKeyPairObject = {
        privateKey,
        publicKey,
        encryptedPrivateKey
      }
      return dataKeyPairObject
    } catch (error) {
      throw new AwsKmsError(error, GENERATE_DATA_KEY_PAIR_ERROR)
    }
  }

  /**
   * Encrypts a given string using AES-256-CBC
   *
   * @async
   * @param [plainText='']
   * @param [options]
   * @returns
   */
  async encrypt(
    plainText: string = '',
    options?: EncryptDecryptOptions
  ): Promise<string> {
    try {
      const { AWS_KEY_ID, CIPHER_TEXT_FORMAT, PLAIN_TEXT_FORMAT } = this.CONFIG
      const {
        cipherTextFormat = CIPHER_TEXT_FORMAT,
        plainTextFormat = PLAIN_TEXT_FORMAT
      } = options || {}

      const Plaintext = Buffer.from(plainText, plainTextFormat)
      const params: EncryptCommandInput = { KeyId: AWS_KEY_ID, Plaintext }
      const command = new EncryptCommand(params)
      const response = await this.client.send(command)

      const { CiphertextBlob } = response
      const ciphertext = Buffer.from(CiphertextBlob || []).toString(
        cipherTextFormat
      )

      return ciphertext
    } catch (error) {
      throw new AwsKmsError(error, ENCRYPT_ERROR)
    }
  }

  /**
   * Decrypts a given string using AES-256-CBC
   *
   * @async
   * @param [ciphertext='']
   * @param [options]
   * @returns
   */
  async decrypt(
    ciphertext: string = '',
    options?: EncryptDecryptOptions
  ): Promise<string> {
    try {
      const { AWS_KEY_ID, CIPHER_TEXT_FORMAT, PLAIN_TEXT_FORMAT } = this.CONFIG
      const {
        cipherTextFormat = CIPHER_TEXT_FORMAT,
        plainTextFormat = PLAIN_TEXT_FORMAT
      } = options || {}

      const CiphertextBlob = Buffer.from(ciphertext, cipherTextFormat)

      const params: DecryptCommandInput = { KeyId: AWS_KEY_ID, CiphertextBlob }
      const command = new DecryptCommand(params)
      const response = await this.client.send(command)

      const { Plaintext } = response
      const plaintext = Buffer.from(Plaintext || []).toString(plainTextFormat)

      return plaintext
    } catch (error) {
      throw new AwsKmsError(error, DECRYPT_ERROR)
    }
  }
}

/** @ignore */
function validateConfig(config: AwsKmsConfig): AwsKmsConfig {
  const { AWS_KEY_ID } = config
  if (!AWS_KEY_ID) {
    throw new AwsKmsError(config, INVALID_CONFIG_ERROR)
  }

  return config
}
