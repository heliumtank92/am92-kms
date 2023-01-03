"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GENERATE_DATA_KEY_PAIR_ERROR = exports.GENERATE_DATA_KEY_ERROR = exports.ENCRYPT_ERROR = exports.DECRYPT_ERROR = void 0;
var GENERATE_DATA_KEY_ERROR = {
  errorCode: 'AwsKms::GENERATE_DATA_KEY'
};
exports.GENERATE_DATA_KEY_ERROR = GENERATE_DATA_KEY_ERROR;
var GENERATE_DATA_KEY_PAIR_ERROR = {
  errorCode: 'AwsKms::GENERATE_DATA_KEY_PAIR'
};
exports.GENERATE_DATA_KEY_PAIR_ERROR = GENERATE_DATA_KEY_PAIR_ERROR;
var ENCRYPT_ERROR = {
  errorCode: 'AwsKms::ENCRYPT'
};
exports.ENCRYPT_ERROR = ENCRYPT_ERROR;
var DECRYPT_ERROR = {
  errorCode: 'AwsKms::DECRYPT'
};
exports.DECRYPT_ERROR = DECRYPT_ERROR;