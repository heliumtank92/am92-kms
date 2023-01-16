import { SERVICE } from '../../CONFIG.mjs'

const DEFAULT_ERROR_MSG = 'Aws Kms Error'
const DEFAULT_ERROR_STATUS_CODE = 500
const DEFAULT_ERROR_CODE = 'AWS_KMS_ERROR'

export default class AwsKmsError extends Error {
  constructor (e = {}, eMap) {
    if (e._isCustomError && !eMap) { return e }

    super()

    const { message, statusCode, errorCode } = eMap || {}
    const {
      message: eMessage,
      $metadata: {
        httpStatusCode: eStatusCode = 500
      } = {}
    } = e

    this._isCustomError = true
    this._isAwsKmsError = true
    this.service = SERVICE
    this.message = message || eMessage || DEFAULT_ERROR_MSG
    this.statusCode = statusCode || eStatusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode = errorCode || DEFAULT_ERROR_CODE
    this.error = e
  }
}
