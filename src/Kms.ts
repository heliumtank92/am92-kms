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
  /**
   * Creates an instance of Kms.
   *
   * @constructor
   * @param config
   */
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
