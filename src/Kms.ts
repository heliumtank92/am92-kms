import { NodeKms } from './lib/NodeKms'
import { AwsKms } from './lib/AwsKms'
import CONFIG from './CONFIG'
import KmsError from './KmsError'
import { INVALID_CONFIG_ERROR } from './ERRORS'
import { AwsKmsConfig, KmsConfig, NodeKmsConfig } from './TYPES'

/**
 * Unified class which returns an instance of {@link NodeKms} or {@link AwsKms} based on `config.TYPE`
 *
 * @class
 */
export default class Kms {
  constructor(config: KmsConfig) {
    const { TYPE } = config

    switch (TYPE) {
      case 'AWS': {
        const kmsConfig: AwsKmsConfig = { ...CONFIG, ...config }
        return new AwsKms(kmsConfig)
      }

      case 'NODE': {
        const kmsConfig: NodeKmsConfig = { ...CONFIG, ...config }
        return new NodeKms(kmsConfig)
      }

      default: {
        throw new KmsError(config, INVALID_CONFIG_ERROR)
      }
    }
  }
}

// export default class Kms {
//   CONFIG: NodeKmsExtendedConfig | AwsKmsConfig

//   private kms: NodeKms | AwsKms

//   constructor(config: KmsConfig) {
//     const { TYPE } = config

//     switch (TYPE) {
//       case 'AWS': {
//         const kmsConfig: AwsKmsConfig = { ...CONFIG, ...config }
//         this.kms = new AwsKms(kmsConfig)
//         this.CONFIG = this.kms.CONFIG
//         break
//       }

//       case 'NODE': {
//         const kmsConfig: NodeKmsConfig = { ...CONFIG, ...config }
//         this.kms = new NodeKms(kmsConfig)
//         this.CONFIG = this.kms.CONFIG
//         break
//       }

//       default: {
//         throw new KmsError(config, INVALID_CONFIG_ERROR)
//       }
//     }
//   }

//   async generateDataKey(): Promise<DataKeyObject> {
//     return this.kms.generateDataKey()
//   }

//   async generateDataKeyPair(): Promise<DataKeyPairObject> {
//     return this.kms.generateDataKeyPair()
//   }

//   async encrypt(
//     plainText: string = '',
//     options?: EncryptDecryptOptions
//   ): Promise<string> {
//     return this.kms.encrypt(plainText, options)
//   }

//   async decrypt(
//     ciphertext: string = '',
//     options?: EncryptDecryptOptions
//   ): Promise<string> {
//     return this.kms.decrypt(ciphertext, options)
//   }
// }
