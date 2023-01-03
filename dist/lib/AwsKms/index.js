"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _clientKms = require("@aws-sdk/client-kms");
var _AwsKmsError = _interopRequireDefault(require("./AwsKmsError.js"));
var _ERRORS = require("./ERRORS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
class AwsKms {
  constructor() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.config = config;
    this.client = new _clientKms.KMSClient(this.config.AWS_CONNECTION_CONFIG);
    this.generateDataKey = this.generateDataKey.bind(this);
    this.generateDataKeyPair = this.generateDataKeyPair.bind(this);
    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
  }
  generateDataKey() {
    var _this = this;
    return _asyncToGenerator(function* () {
      try {
        var {
          AWS_KEY_ID,
          KEY_SPEC,
          KEY_FORMAT
        } = _this.config;
        var params = {
          KeyId: AWS_KEY_ID,
          KeySpec: KEY_SPEC
        };
        var command = new _clientKms.GenerateDataKeyCommand(params);
        var response = yield _this.client.send(command);
        var {
          CiphertextBlob,
          Plaintext
        } = response;
        var encryptedDataKey = Buffer.from(CiphertextBlob).toString(KEY_FORMAT);
        var dataKey = Buffer.from(Plaintext).toString(KEY_FORMAT);
        return {
          dataKey,
          encryptedDataKey
        };
      } catch (error) {
        throw new _AwsKmsError.default(error, _ERRORS.GENERATE_DATA_KEY_ERROR);
      }
    })();
  }
  generateDataKeyPair() {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      try {
        var {
          AWS_KEY_ID,
          KEY_PAIR_SPEC,
          KEY_FORMAT
        } = _this2.config;
        var params = {
          KeyId: AWS_KEY_ID,
          KeyPairSpec: KEY_PAIR_SPEC
        };
        var command = new _clientKms.GenerateDataKeyPairCommand(params);
        var response = yield _this2.client.send(command);
        var {
          PrivateKeyCiphertextBlob,
          PrivateKeyPlaintext,
          PublicKey
        } = response;
        var encryptedPrivateKey = Buffer.from(PrivateKeyCiphertextBlob).toString(KEY_FORMAT);
        var privateKey = Buffer.from(PrivateKeyPlaintext).toString(KEY_FORMAT);
        var publicKey = Buffer.from(PublicKey).toString(KEY_FORMAT);
        var data = {
          privateKey,
          publicKey,
          encryptedPrivateKey
        };
        return data;
      } catch (error) {
        throw new _AwsKmsError.default(error, _ERRORS.GENERATE_DATA_KEY_PAIR_ERROR);
      }
    })();
  }
  encrypt() {
    var _arguments = arguments,
      _this3 = this;
    return _asyncToGenerator(function* () {
      var Plaintext = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : '';
      var options = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
      try {
        var {
          AWS_KEY_ID,
          CIPHER_TEXT_FORMAT
        } = _this3.config;
        var {
          cipherTextFormat = CIPHER_TEXT_FORMAT
        } = options;
        var params = {
          KeyId: AWS_KEY_ID,
          Plaintext
        };
        var command = new _clientKms.EncryptCommand(params);
        var response = yield _this3.client.send(command);
        var {
          CiphertextBlob
        } = response;
        var ciphertext = Buffer.from(CiphertextBlob).toString(cipherTextFormat);
        return ciphertext;
      } catch (error) {
        throw new _AwsKmsError.default(error, _ERRORS.ENCRYPT_ERROR);
      }
    })();
  }
  decrypt() {
    var _arguments2 = arguments,
      _this4 = this;
    return _asyncToGenerator(function* () {
      var Ciphertext = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : '';
      var options = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : {};
      try {
        var {
          AWS_KEY_ID,
          CIPHER_TEXT_FORMAT,
          PLAIN_TEXT_FORMAT
        } = _this4.config;
        var {
          cipherTextFormat = CIPHER_TEXT_FORMAT,
          plainTextFormat = PLAIN_TEXT_FORMAT
        } = options;
        var CiphertextBlob = Buffer.from(Ciphertext, cipherTextFormat);
        var params = {
          KeyId: AWS_KEY_ID,
          CiphertextBlob
        };
        var command = new _clientKms.DecryptCommand(params);
        var response = yield _this4.client.send(command);
        var {
          Plaintext
        } = response;
        var plaintext = Buffer.from(Plaintext).toString(plainTextFormat);
        return plaintext;
      } catch (error) {
        throw new _AwsKmsError.default(error, _ERRORS.DECRYPT_ERROR);
      }
    })();
  }
}
exports.default = AwsKms;