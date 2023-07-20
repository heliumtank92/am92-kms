import { KmsErrorMap } from '../../TYPES'

export const INVALID_CONFIG_ERROR: KmsErrorMap = {
  message: 'Invalid Config',
  errorCode: 'AwsKms::INVALID_CONFIG'
}

export const GENERATE_DATA_KEY_ERROR: KmsErrorMap = {
  errorCode: 'AwsKms::GENERATE_DATA_KEY'
}

export const GENERATE_DATA_KEY_PAIR_ERROR: KmsErrorMap = {
  errorCode: 'AwsKms::GENERATE_DATA_KEY_PAIR'
}

export const ENCRYPT_ERROR: KmsErrorMap = {
  errorCode: 'AwsKms::ENCRYPT'
}

export const DECRYPT_ERROR: KmsErrorMap = {
  errorCode: 'AwsKms::DECRYPT'
}
