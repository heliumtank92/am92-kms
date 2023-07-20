import { SERVICE } from '../../CONFIG'
import { KmsErrorMap } from '../../TYPES'

/** @ignore */
const DEFAULT_ERROR_MSG = 'Aws Kms Error'
/** @ignore */
const DEFAULT_ERROR_STATUS_CODE = 500
/** @ignore */
const DEFAULT_ERROR_CODE = 'AwsKmsError::GENERIC'

/**
 * Error class whose instance is thrown in case of any error.
 *
 * @class
 * @typedef {AwsKmsError}
 * @extends {Error}
 */
export default class AwsKmsError extends Error {
  /**
   * Flag to identify if error is a custom error.
   */
  readonly _isCustomError = true
  /**
   * Flag to identify if error is a AwsKmsError.
   */
  readonly _isAwsKmsError = true
  /**
   * Aws project from which Error is thrown.
   */
  readonly service: string
  /**
   * Error's message string.
   */
  message: string
  /**
   * HTTP status code associated with the error.
   */
  statusCode: number
  /**
   * Error Code.
   */
  errorCode: string
  /**
   * Error object.
   */
  error?: any
  /**
   * Creates an instance of AwsKmsError.
   *
   * @constructor
   * @param [e] Any Error instance to wrap with AwsKmsError.
   * @param [eMap] KmsErrorMap to rewrap error for better understanding.
   */
  constructor(e: any, eMap: KmsErrorMap) {
    super()

    const { $metadata: { httpStatusCode: eStatusCode = 500 } = {} } = e

    this.service = SERVICE
    this.message = eMap?.message || e?.message || DEFAULT_ERROR_MSG
    this.statusCode =
      eMap?.statusCode || eStatusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode = eMap?.errorCode || e?.code || DEFAULT_ERROR_CODE
    this.error = e
  }
}
