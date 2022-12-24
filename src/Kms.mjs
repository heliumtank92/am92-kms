import NodeKms from './lib/NodeKms/index.mjs'
import AwsKms from './lib/AwsKms/index.mjs'
import CONFIG from './CONFIG.mjs'

const { TYPE } = CONFIG

const Kms = {
  generateDataKey,
  generateDataKeyPair,
  encrypt,
  decrypt
}

export default Kms

async function generateDataKey () {
  if (TYPE === 'NODE') { return NodeKms.generateDataKey() }
  if (TYPE === 'AWS') { return AwsKms.generateDataKey() }
}
async function generateDataKeyPair () {
  if (TYPE === 'NODE') { return NodeKms.generateDataKeyPair() }
  if (TYPE === 'AWS') { return AwsKms.generateDataKeyPair() }
}

async function encrypt (plainText = '', options = {}) {
  if (TYPE === 'NODE') { return NodeKms.encrypt(plainText, options) }
  if (TYPE === 'AWS') { return AwsKms.encrypt(plainText, options) }
}

async function decrypt (ciphertext = '', options = {}) {
  if (TYPE === 'NODE') { return NodeKms.decrypt(ciphertext, options) }
  if (TYPE === 'AWS') { return AwsKms.decrypt(ciphertext, options) }
}
