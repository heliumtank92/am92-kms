"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("./lib/NodeKms/index.js"));
var _index2 = _interopRequireDefault(require("./lib/AwsKms/index.js"));
var _CONFIG = _interopRequireDefault(require("./CONFIG.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Kms {
  constructor() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var kmsConfig = _objectSpread(_objectSpread({}, _CONFIG.default), config);
    var {
      TYPE
    } = kmsConfig;
    var kms;
    switch (TYPE) {
      case 'AWS':
        {
          kms = new _index2.default(kmsConfig);
          break;
        }
      case 'NODE':
        {
          kms = new _index.default(kmsConfig);
          break;
        }
    }
    if (kms) {
      this.TYPE = TYPE;
      this.generateDataKey = kms.generateDataKey;
      this.generateDataKeyPair = kms.generateDataKeyPair;
      this.encrypt = kms.encrypt;
      this.decrypt = kms.decrypt;
    }
  }
}
exports.default = Kms;