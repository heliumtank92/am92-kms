/**
 * Type definition of KMS Config common to all
 *
 * @interface
 */
export interface CommonKmsConfig {
  /**
   * Symmetric encryption algorithm for which the data key is to be generated.
   */
  KEY_SPEC?: 'AES_128' | 'AES_256' | string
  /**
   * Asymmetric encryption algorithm for which the data key pair is to be generated.
   */
  KEY_PAIR_SPEC?: 'RSA_2048' | 'RSA_3072' | 'RSA_4096' | string

  /**
   * String format of the input/output keys.
   */
  KEY_FORMAT?: BufferEncoding
  /**
   * String format of plain text when encrypting/decrypting.
   */
  PLAIN_TEXT_FORMAT?: BufferEncoding
  /**
   * String format of cipher text when encrypting/decrypting.
   */
  CIPHER_TEXT_FORMAT?: BufferEncoding
}

/**
 * Type definition of input config to {@link NodeKms} class
 *
 * @interface
 * @extends {CommonKmsConfig}
 */
export interface NodeKmsConfig extends CommonKmsConfig {
  /**
   * Master key to be used for encrypting/decrypting
   */
  MASTER_KEY_HEX?: string
  /**
   * Master IV to be used for encrypting/decrypting
   */
  MASTER_IV_HEX?: string
}

/**
 * Type definition of the config object processed by {@link NodeKms} class
 *
 * @interface
 * @extends {NodeKmsConfig}
 */
export interface NodeKmsExtendedConfig extends NodeKmsConfig {
  /**
   * Symmetric encryption algorithm for generateDataKey()
   */
  KEY_ALGO: 'aes' | 'hmac'
  /**
   * Key length of symmetric encryption algorithm for generateDataKey()
   */
  KEY_LENGTH: number
  /**
   * Aymmetric encryption algorithm for generateDataKeyPair()
   */
  KEY_PAIR_ALGO: 'rsa'
  /**
   * Key length of asymmetric encryption algorithm for generateDataKeyPair()
   */
  KEY_PAIR_LENGTH: number
  /**
   * ArrayBuffer of MASTER_KEY_HEX
   */
  MASTER_KEY_BUFFER: Buffer
  /**
   * ArrayBuffer of MASTER_IV_HEX
   */
  MASTER_IV_BUFFER: Buffer
}

/**
 * Type definition of input config to {@link AwsKms} class
 *
 * @interface
 * @extends {CommonKmsConfig}
 */
export interface AwsKmsConfig extends CommonKmsConfig {
  /**
   * AWS Key ID or AWS Key Alias to be used when `TYPE = 'AWS'`. If Key alias is to be used, it should be defined as `alias/{aliasName}`.
   */
  AWS_KEY_ID?: string
  /**
   * Configurations for aws-sdk's KMSClient class
   */
  AWS_CONNECTION_CONFIG?: {
    /**
     * AWS region of KMS
     */
    region: string
  }
}

/**
 * Type definition of config object for Kms Class
 *
 * @interface
 */
export interface KmsConfig {
  /**
   * Key to identify if KMS is enabled or not.
   *
   * Note: This is not required to be passed in the Kms Class and is rather used internally when reading values from `process.env`.
   * @default false
   */
  ENABLED?: boolean
  /**
   * The type of KMS to be used when methods are executed
   *
   * Note: This value is read from `process.env.KMS_TYPE` if this key is not set in the object passed to Kms Class.
   */
  TYPE: 'AWS' | 'NODE' | string

  /**
   * Symmetric encryption algorithm for which the data key is to be generated.
   *
   * Note: This value is read from `process.env.KEY_SPEC` if this key is not set in the object passed to Kms Class.
   * @default "AES_256"
   */
  KEY_SPEC?: 'AES_128' | 'AES_256' | string
  /**
   * Asymmetric encryption algorithm for which the data key pair is to be generated.
   *
   * Note: This value is read from `process.env.KEY_PAIR_SPEC` if this key is not set in the object passed to Kms Class.
   * @default "RSA_2048"
   */
  KEY_PAIR_SPEC?: 'RSA_2048' | 'RSA_3072' | 'RSA_4096' | string

  /**
   * String format of the input/output keys.
   *
   * Note: This value is read from `process.env.KEY_FORMAT` if this key is not set in the object passed to Kms Class.
   * @default "base64"
   */
  KEY_FORMAT?: BufferEncoding
  /**
   * String format of plain text when encrypting/decrypting.
   *
   * Note: This value is read from `process.env.PLAIN_TEXT_FORMAT` if this key is not set in the object passed to Kms Class.
   * @default "utf8"
   */
  PLAIN_TEXT_FORMAT?: BufferEncoding
  /**
   * String format of cipher text when encrypting/decrypting.
   *
   * Note: This value is read from `process.env.CIPHER_TEXT_FORMAT` if this key is not set in the object passed to Kms Class.
   * @default "base64"
   */
  CIPHER_TEXT_FORMAT?: BufferEncoding

  /**
   * Master key to be used for encrypting/decrypting when `TYPE = 'NODE'`.
   *
   * Note: This value is read from `process.env.MASTER_KEY_HEX` if this key is not set in the object passed to Kms Class.
   * @default "0000000000000000000000000000000000000000000000000000000000000000"
   */
  MASTER_KEY_HEX?: string
  /**
   * Master IV to be used for encrypting/decrypting when `TYPE = 'NODE'`.
   *
   * Note: This value is read from `process.env.MASTER_IV_HEX` if this key is not set in the object passed to Kms Class.
   * @default "00000000000000000000000000000000"
   */
  MASTER_IV_HEX?: string

  /**
   * AWS Key ID or AWS Key Alias to be used when `TYPE = 'AWS'`. If Key alias is to be used, it should be defined as `alias/{aliasName}`.
   *
   * Note: This is mandatory if `TYPE = 'AWS'`.
   *
   * Note: This value is read from `process.env.AWS_KEY_ID` if this key is not set in the object passed to Kms Class.
   */
  AWS_KEY_ID?: string
  /**
   * Configurations for aws-sdk's KMSClient class.
   */
  AWS_CONNECTION_CONFIG?: {
    /**
     * AWS region of KMS when `TYPE = 'AWS'`.
     *
     * Note: This value is read from `process.env.KMS_AWS_REGION` if this key is not set in the object passed to Kms Class.
     * @default "ap-south-1"
     */
    region: string
  }
}

/**
 * Type definition of options object for encryption and decryption
 *
 * @interface
 */
export interface EncryptDecryptOptions {
  /**
   * String format of cipher text
   */
  cipherTextFormat?: BufferEncoding
  /**
   * String format of plain text
   */
  plainTextFormat?: BufferEncoding
}

/**
 * Type definition of the returned value of generateDataKey()
 *
 * @interface
 */
export interface DataKeyObject {
  /**
   * Data key string in key format as defined in KmsConfig
   */
  dataKey: string
  /**
   * Encrypted data key string in key format as defined in KmsConfig
   */
  encryptedDataKey: string
}

/**
 * Type definition of the returned value of generateDataKeyPair()
 *
 * @interface
 */
export interface DataKeyPairObject {
  /**
   * Private key string in key format as defined in KmsConfig
   */
  privateKey: string
  /**
   * Public key string in key format as defined in KmsConfig
   */
  publicKey: string
  /**
   * Encrypted private key string in key format as defined in KmsConfig
   */
  encryptedPrivateKey: string
}

/**
 * Type defination for error map to be passed to KmsErrorMap.
 *
 * @interface
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
