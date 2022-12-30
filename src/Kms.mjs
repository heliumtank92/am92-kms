import NodeKms from './lib/NodeKms/index.mjs'
import AwsKms from './lib/AwsKms/index.mjs'
import CONFIG from './CONFIG.mjs'

export default class Kms {
  constructor (config = {}) {
    const kmsConfig = { ...CONFIG, ...config }
    const { TYPE } = kmsConfig
    let kms

    switch (TYPE) {
      case 'AWS': {
        kms = new AwsKms(kmsConfig)
        break
      }

      case 'NODE': {
        kms = new NodeKms(kmsConfig)
        break
      }
    }

    if (kms) {
      this.TYPE = TYPE
      this.generateDataKey = kms.generateDataKey
      this.generateDataKeyPair = kms.generateDataKeyPair
      this.encrypt = kms.encrypt
      this.decrypt = kms.decrypt
    }
  }
}
