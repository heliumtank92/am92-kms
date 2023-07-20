export interface CommonKmsConfig {
  ENABLED: boolean
  TYPE: 'AWS' | 'NODE' | string

  KEY_SPEC: string
  KEY_PAIR_SPEC: string

  KEY_FORMAT: BufferEncoding
  PLAIN_TEXT_FORMAT: BufferEncoding
  CIPHER_TEXT_FORMAT: BufferEncoding
}

export interface NodeKmsConfig extends CommonKmsConfig {
  MASTER_KEY_HEX: string
  MASTER_IV_HEX: string
}

export interface AwsKmsConfig extends CommonKmsConfig {
  AWS_KEY_ID: string
  AWS_CONNECTION_CONFIG: any
}

export interface KmsConfig extends NodeKmsConfig, AwsKmsConfig {}

export interface NodeKmsExtendedConfig extends NodeKmsConfig {
  KEY_ALGO: 'aes'
  KEY_LENGTH: number
  KEY_PAIR_ALGO: 'rsa'
  KEY_PAIR_LENGTH: number
  MASTER_KEY_BUFFER: Buffer
  MASTER_IV_BUFFER: Buffer
}

export interface EncryptDecryptOptions {
  cipherTextFormat?: BufferEncoding
  plainTextFormat?: BufferEncoding
}

export interface DataKeyObject {
  dataKey: string
  encryptedDataKey: string
}

export interface DataKeyPairObject {
  privateKey: string
  publicKey: string
  encryptedPrivateKey: string
}

/**
 * Type defination for error map to be passed to KmsErrorMap.
 *
 * @interface
 * @typedef {KmsErrorMap}
 */
export interface KmsErrorMap {
  /**
   * Overriding message string for KmsError instance
   */
  message?: string
  /**
   * Overriding error code string for KmsError instance
   */
  errorCode?: string
  /**
   * Overriding HTTP status code for KmsError instance
   */
  statusCode?: number
}

declare global {
  /** @ignore */
  interface Console {
    success?(...data: any[]): void
    fatal?(...data: any[]): void
  }
}
