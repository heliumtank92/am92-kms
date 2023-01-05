const {
  KMS_ENABLED = 'false',
  KMS_TYPE = '',
  KMS_KEY_SPEC = 'AES_256',
  KMS_KEY_PAIR_SPEC = 'RSA_2048',

  KMS_KEY_FORMAT = 'base64',
  KMS_PLAIN_TEXT_FORMAT = 'utf8',
  KMS_CIPHER_TEXT_FORMAT = 'base64',

  KMS_MASTER_KEY_HEX = '',
  KMS_MASTER_IV_HEX = '00000000000000000000000000000000',
  KMS_AWS_REGION = 'ap-south-1',
  KMS_AWS_KEY_ID = ''
} = process.env

const ENABLED = KMS_ENABLED === 'true'

const REQUIRED_CONFIG = []
const MISSING_CONFIGS = []

if (ENABLED) {
  if (KMS_TYPE === 'NODE') {
    REQUIRED_CONFIG.push('KMS_MASTER_KEY')
  }

  if (KMS_TYPE === 'AWS') {
    REQUIRED_CONFIG.push('KMS_AWS_KEY_ID')
  }
}

REQUIRED_CONFIG.forEach(function (key) {
  if (!process.env[key]) {
    MISSING_CONFIGS.push(key)
  }
})

if (MISSING_CONFIGS.length) {
  console.error(`Missing Kms Configs: ${MISSING_CONFIGS.join(', ')}`)
  process.exit(1)
}

const CONFIG = {
  ENABLED,
  TYPE: KMS_TYPE,
  KEY_SPEC: KMS_KEY_SPEC,
  KEY_PAIR_SPEC: KMS_KEY_PAIR_SPEC,

  KEY_FORMAT: KMS_KEY_FORMAT,
  PLAIN_TEXT_FORMAT: KMS_PLAIN_TEXT_FORMAT,
  CIPHER_TEXT_FORMAT: KMS_CIPHER_TEXT_FORMAT,

  MASTER_KEY_HEX: KMS_MASTER_KEY_HEX,
  MASTER_IV_HEX: KMS_MASTER_IV_HEX,
  AWS_KEY_ID: KMS_AWS_KEY_ID,
  AWS_CONNECTION_CONFIG: {
    region: KMS_AWS_REGION
  }
}

export default CONFIG

const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = ''
} = process.env
const SERVICE = `${pkgName}@${pkgVersion}`

export { SERVICE }
