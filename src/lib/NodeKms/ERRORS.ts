import { KmsErrorMap } from '../../TYPES'

/** @ignore */
export const INVALID_CONFIG_ERROR: KmsErrorMap = {
  message: 'Invalid Config',
  errorCode: 'NodeKms::INVALID_CONFIG'
}

/** @ignore */
export const INVALID_KEY_SPEC_ERROR: KmsErrorMap = {
  message: 'Invalid Key Spec',
  errorCode: 'NodeKms::INVALID_KEY_SPEC'
}

/** @ignore */
export const INVALID_KEY_PAIR_SPEC_ERROR: KmsErrorMap = {
  message: 'Invalid Key Pair Spec',
  errorCode: 'NodeKms::INVALID_KEY_PAIR_SPEC'
}

/** @ignore */
export const INVALD_MASTER_KEY_HEX_ERROR: KmsErrorMap = {
  message: 'Invald Node Master Key Hex',
  errorCode: 'NodeKms::INVALD_MASTER_KEY_HEX'
}

/** @ignore */
export const INVALID_MASTER_IV_HEX_ERROR: KmsErrorMap = {
  message: 'Invalid Node Master Iv Hex',
  errorCode: 'NodeKms::INVALID_MASTER_IV_HEX'
}
