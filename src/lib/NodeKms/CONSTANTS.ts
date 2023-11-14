import { KeyExportOptions } from 'crypto'

/** @ignore */
export const VALID_KEY_SPECS = ['AES_128', 'AES_256']

/** @ignore */
export const VALID_KEY_PAIR_SPECS = ['RSA_2048', 'RSA_3072', 'RSA_4096']

/** @ignore */
export const ENCRYPTION_ALGO = 'aes-256-cbc'

/** @ignore */
export const MASTER_KEY_LENGTH = 32

/** @ignore */
export const MASTER_IV_LENGTH = 16

/** @ignore */
export const PRIVATE_KEY_EXPORT_OPTIONS: KeyExportOptions<'der'> = {
  type: 'pkcs8',
  format: 'der'
}

/** @ignore */
export const PUBLIC_KEY_EXPORT_OPTIONS: KeyExportOptions<'der'> = {
  type: 'spki',
  format: 'der'
}
