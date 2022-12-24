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
        httpStatusCode: eStatusCode = 500,
        cfId,
        extendedRequestId,
        requestId
      } = {}
    } = e

    const {
      npm_package_name: pkgName = '',
      npm_package_version: pkgVersion = ''
    } = process.env
    const service = `${pkgName}@${pkgVersion}`

    this._isCustomError = true
    this._isKmsError = true
    this.service = service
    this.message = message || eMessage || DEFAULT_ERROR_MSG
    this.statusCode = statusCode || eStatusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode = errorCode || DEFAULT_ERROR_CODE
    this.error = {
      ...e,
      message: eMessage || this.message,
      errorCode: this.errorCode,
      cfId,
      extendedRequestId,
      requestId
    }
  }
}
