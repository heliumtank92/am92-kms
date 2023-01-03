"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
var _NodeKmsError = _interopRequireDefault(require("./NodeKmsError.js"));
var _CONSTANTS = require("./CONSTANTS.js");
var _ERRORS = require("./ERRORS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class NodeKms {
  constructor() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var derivedConfig = deriveConfig(config);
    this.config = _objectSpread(_objectSpread({}, config), derivedConfig);
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
          KEY_ALGO,
          KEY_LENGTH,
          KEY_FORMAT
        } = _this.config;
        var options = {
          length: KEY_LENGTH
        };
        var keyObject = _crypto.default.generateKeySync(KEY_ALGO, options);
        var dataKey = keyObject.export().toString(KEY_FORMAT);
        var encryptOptions = {
          cipherTextFormat: KEY_FORMAT,
          plainTextFormat: KEY_FORMAT
        };
        var encryptedDataKey = yield _this.encrypt(dataKey, encryptOptions);
        return {
          dataKey,
          encryptedDataKey
        };
      } catch (error) {
        var errorCode = "NodeKms::".concat(error.code);
        throw new _NodeKmsError.default(error, {
          errorCode
        });
      }
    })();
  }
  generateDataKeyPair() {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      try {
        var {
          KEY_PAIR_ALGO,
          KEY_PAIR_LENGTH,
          KEY_FORMAT
        } = _this2.config;
        var options = {
          modulusLength: KEY_PAIR_LENGTH
        };
        var {
          privateKey,
          publicKey
        } = _crypto.default.generateKeyPairSync(KEY_PAIR_ALGO, options);
        privateKey = privateKey.export(_CONSTANTS.PRIVATE_KEY_EXPORT_OPTIONS).toString(KEY_FORMAT);
        publicKey = publicKey.export(_CONSTANTS.PUBLIC_KEY_EXPORT_OPTIONS).toString(KEY_FORMAT);
        var encryptOptions = {
          cipherTextFormat: KEY_FORMAT,
          plainTextFormat: KEY_FORMAT
        };
        var encryptedPrivateKey = yield _this2.encrypt(privateKey, encryptOptions);
        return {
          privateKey,
          publicKey,
          encryptedPrivateKey
        };
      } catch (error) {
        var errorCode = "NodeKms::".concat(error.code);
        throw new _NodeKmsError.default(error, {
          errorCode
        });
      }
    })();
  }
  encrypt() {
    var _arguments = arguments,
      _this3 = this;
    return _asyncToGenerator(function* () {
      var plainText = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : '';
      var options = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
      var {
        MASTER_KEY_BUFFER,
        MASTER_IV_BUFFER,
        CIPHER_TEXT_FORMAT,
        PLAIN_TEXT_FORMAT
      } = _this3.config;
      var {
        cipherTextFormat = CIPHER_TEXT_FORMAT,
        plainTextFormat = PLAIN_TEXT_FORMAT
      } = options;
      try {
        var encryptor = _crypto.default.createCipheriv(_CONSTANTS.ENCRYPTION_ALGO, MASTER_KEY_BUFFER, MASTER_IV_BUFFER);
        var cipherTextBuffer = Buffer.concat([encryptor.update(plainText, plainTextFormat), encryptor.final()]);
        var cipherText = cipherTextBuffer.toString(cipherTextFormat);
        return cipherText;
      } catch (error) {
        var errorCode = "NodeKms::".concat(error.code);
        throw new _NodeKmsError.default(error, {
          errorCode
        });
      }
    })();
  }
  decrypt() {
    var _arguments2 = arguments,
      _this4 = this;
    return _asyncToGenerator(function* () {
      var ciphertext = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : '';
      var options = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : {};
      var {
        MASTER_KEY_HEX,
        MASTER_IV_HEX,
        CIPHER_TEXT_FORMAT,
        PLAIN_TEXT_FORMAT
      } = _this4.config;
      var {
        cipherTextFormat = CIPHER_TEXT_FORMAT,
        plainTextFormat = PLAIN_TEXT_FORMAT
      } = options;
      var keyBuffer = Buffer.from(MASTER_KEY_HEX, 'hex');
      var ivBuffer = Buffer.from(MASTER_IV_HEX, 'hex');
      var cipherTextBuffer = Buffer.from(ciphertext, cipherTextFormat);
      try {
        var decryptor = _crypto.default.createDecipheriv(_CONSTANTS.ENCRYPTION_ALGO, keyBuffer, ivBuffer);
        var plainTextBuffer = Buffer.concat([decryptor.update(cipherTextBuffer), decryptor.final()]);
        var plainText = plainTextBuffer.toString(plainTextFormat);
        return plainText;
      } catch (error) {
        var errorCode = "NodeKms::".concat(error.code);
        throw new _NodeKmsError.default(error, {
          errorCode
        });
      }
    })();
  }
}
exports.default = NodeKms;
function deriveConfig(config) {
  var {
    KEY_SPEC,
    KEY_PAIR_SPEC,
    MASTER_KEY_HEX,
    MASTER_IV_HEX
  } = config;
  if (!_CONSTANTS.VALID_KEY_SPECS.includes(KEY_SPEC)) {
    throw new _NodeKmsError.default({
      KEY_SPEC
    }, _ERRORS.INVALID_KEY_SPEC_ERROR);
  }
  if (!_CONSTANTS.VALID_KEY_PAIR_SPECS.includes(KEY_PAIR_SPEC)) {
    throw new _NodeKmsError.default({
      KEY_PAIR_SPEC
    }, _ERRORS.INVALID_KEY_PAIR_SPEC_ERROR);
  }
  var keySpecArray = KEY_SPEC.split('_');
  var KEY_ALGO = keySpecArray[0].toLowerCase();
  var KEY_LENGTH = parseInt(keySpecArray[1], 10);
  var keyPairSpecArray = KEY_PAIR_SPEC.split('_');
  var KEY_PAIR_ALGO = keyPairSpecArray[0].toLowerCase();
  var KEY_PAIR_LENGTH = parseInt(keyPairSpecArray[1], 10);
  var MASTER_KEY_BUFFER = Buffer.from(MASTER_KEY_HEX, 'hex');
  var MASTER_IV_BUFFER = Buffer.from(MASTER_IV_HEX, 'hex');
  if (MASTER_KEY_BUFFER.length !== _CONSTANTS.MASTER_KEY_LENGTH) {
    throw new _NodeKmsError.default({
      MASTER_KEY_HEX
    }, _ERRORS.INVALD_MASTER_KEY_HEX_ERROR);
  }
  if (MASTER_IV_BUFFER.length !== _CONSTANTS.MASTER_IV_LENGTH) {
    throw new _NodeKmsError.default({
      MASTER_IV_HEX
    }, _ERRORS.INVALID_MASTER_IV_HEX_ERROR);
  }
  return {
    KEY_ALGO,
    KEY_LENGTH,
    KEY_PAIR_ALGO,
    KEY_PAIR_LENGTH,
    MASTER_KEY_BUFFER,
    MASTER_IV_BUFFER
  };
}