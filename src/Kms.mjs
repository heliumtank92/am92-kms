import NodeKms from './lib/NodeKms/index.mjs'
import AwsKms from './lib/AwsKms/index.mjs'
import CONFIG from './CONFIG.mjs'

export default class Kms {
  constructor (config = {}) {
    const kmsConfig = { ...CONFIG, ...config }
    const { TYPE } = kmsConfig

    switch (TYPE) {
      case 'AWS': {
        return new AwsKms(kmsConfig)
      }

      case 'NODE': {
        return new NodeKms(kmsConfig)
      }
    }
  }
}
