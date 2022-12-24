import {
  KMSClient,
  GenerateDataKeyCommand,
  GenerateDataKeyPairCommand,
  EncryptCommand,
  DecryptCommand
} from '@aws-sdk/client-kms'
import AwsKmsError from './AwsKmsError.mjs'

import CONFIG from '../../CONFIG.mjs'
import {
  GENERATE_DATA_KEY_ERRORS,
  GENERATE_DATA_KEY_PAIR_ERRORS,
  ENCRYPT_ERRORS,
  DECRYPT_ERRORS
} from './ERRORS.mjs'

const {
  KEY_PAIR_ALGO,
  KEY_PAIR_LENGTH,
  KEY_ALGO,
  KEY_LENGTH,
  KEY_FORMAT,
  PLAIN_TEXT_FORMAT,
  CIPHER_TEXT_FORMAT,

  AWS_KEY_ID,
  AWS_CONNECTION_CONFIG
} = CONFIG

const KeySpec = `${KEY_ALGO.toUpperCase()}_${KEY_LENGTH}`
const KeyPairSpec = `${KEY_PAIR_ALGO.toUpperCase()}_${KEY_PAIR_LENGTH}`
const client = new KMSClient(AWS_CONNECTION_CONFIG)

const AwsKms = {
  generateDataKey,
  generateDataKeyPair,
  encrypt,
  decrypt
}

export default AwsKms

async function generateDataKey () {
  try {
    const params = { KeyId: AWS_KEY_ID, KeySpec }
    const command = new GenerateDataKeyCommand(params)
    const response = await client.send(command)

    const { CiphertextBlob, Plaintext } = response
    const encryptedDataKey = Buffer.from(CiphertextBlob).toString(KEY_FORMAT)
    const dataKey = Buffer.from(Plaintext).toString(KEY_FORMAT)

    return { dataKey, encryptedDataKey }
  } catch (error) {
    throw new AwsKmsError(error, GENERATE_DATA_KEY_ERRORS)
  }
}
async function generateDataKeyPair () {
  try {
    const params = { KeyId: AWS_KEY_ID, KeyPairSpec }
    const command = new GenerateDataKeyPairCommand(params)
    const response = await client.send(command)

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
    throw new AwsKmsError(error, GENERATE_DATA_KEY_PAIR_ERRORS)
  }
}

async function encrypt (Plaintext = '', options = {}) {
  try {
    const { cipherTextFormat = CIPHER_TEXT_FORMAT } = options
    const params = { KeyId: AWS_KEY_ID, Plaintext }
    const command = new EncryptCommand(params)
    const response = await client.send(command)

    const { CiphertextBlob } = response
    const ciphertext = Buffer.from(CiphertextBlob).toString(cipherTextFormat)

    return ciphertext
  } catch (error) {
    throw new AwsKmsError(error, ENCRYPT_ERRORS)
  }
}

async function decrypt (Ciphertext = '', options = {}) {
  try {
    const {
      cipherTextFormat = CIPHER_TEXT_FORMAT,
      plainTextFormat = PLAIN_TEXT_FORMAT
    } = options
    const CiphertextBlob = Buffer.from(Ciphertext, cipherTextFormat)

    const params = { KeyId: AWS_KEY_ID, CiphertextBlob }
    const command = new DecryptCommand(params)
    const response = await client.send(command)

    const { Plaintext } = response
    const plaintext = Buffer.from(Plaintext).toString(plainTextFormat)

    return plaintext
  } catch (error) {
    throw new AwsKmsError(error, DECRYPT_ERRORS)
  }
}
