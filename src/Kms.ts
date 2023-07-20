import { NodeKms } from './lib/NodeKms'
import { AwsKms } from './lib/AwsKms'
import CONFIG from './CONFIG'
import KmsError from './KmsError'
import { INVALID_CONFIG_ERROR } from './ERRORS'
import {
  AwsKmsConfig,
  EncryptDecryptOptions,
  KmsConfig,
  NodeKmsExtendedConfig
} from './TYPES'

export default class Kms {
  CONFIG: NodeKmsExtendedConfig | AwsKmsConfig
  private kms: NodeKms | AwsKms

  constructor(config: KmsConfig) {
    const kmsConfig: KmsConfig = { ...CONFIG, ...config }
    const { TYPE } = kmsConfig

    switch (TYPE) {
      case 'AWS': {
        this.kms = new AwsKms(kmsConfig)
        this.CONFIG = this.kms.CONFIG
        break
      }

      case 'NODE': {
        this.kms = new NodeKms(kmsConfig)
        this.CONFIG = this.kms.CONFIG
        break
      }

      default: {
        throw new KmsError(config, INVALID_CONFIG_ERROR)
      }
    }
  }

  async generateDataKey() {
    return this.kms.generateDataKey()
  }

  async generateDataKeyPair() {
    return this.kms.generateDataKeyPair()
  }

  async encrypt(plainText: string = '', options?: EncryptDecryptOptions) {
    return this.kms.encrypt(plainText, options)
  }

  async decrypt(ciphertext: string = '', options?: EncryptDecryptOptions) {
    return this.kms.decrypt(ciphertext, options)
  }
}
