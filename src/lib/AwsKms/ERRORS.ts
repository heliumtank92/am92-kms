import { KmsErrorMap } from '../../TYPES'

/** @ignore */
export const INVALID_CONFIG_ERROR: KmsErrorMap = {
  message: 'Invalid Config',
  errorCode: 'AwsKms::INVALID_CONFIG'
}

/** @ignore */
export const GENERATE_DATA_KEY_ERROR: KmsErrorMap = {
  errorCode: 'AwsKms::GENERATE_DATA_KEY'
}

/** @ignore */
export const GENERATE_DATA_KEY_PAIR_ERROR: KmsErrorMap = {
  errorCode: 'AwsKms::GENERATE_DATA_KEY_PAIR'
}

/** @ignore */
export const ENCRYPT_ERROR: KmsErrorMap = {
  errorCode: 'AwsKms::ENCRYPT'
}

/** @ignore */
export const DECRYPT_ERROR: KmsErrorMap = {
  errorCode: 'AwsKms::DECRYPT'
}
