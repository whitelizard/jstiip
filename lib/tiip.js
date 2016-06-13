'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.pack = pack;
exports.packObj = packObj;
exports.unpack = unpack;
exports.unpackVerify = unpackVerify;

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseMessage() {
  return {
    'protocol': 'tiip.0.9',
    'timestamp': Date.now() / 1000 + ''
  };
}

function pack(type, target, signal, arguments_, payload, mid, tenant, source, sid, ok, subTarget) {
  var msg = baseMessage();

  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) !== undefined && type !== null) msg.type = type;
  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== undefined && target !== null) msg.target = target;
  if ((typeof signal === 'undefined' ? 'undefined' : _typeof(signal)) !== undefined && signal !== null) msg.signal = signal;
  if ((typeof arguments_ === 'undefined' ? 'undefined' : _typeof(arguments_)) !== undefined && arguments_ !== null) msg.arguments = arguments_;
  if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) !== undefined && payload !== null) msg.payload = payload;
  if ((typeof mid === 'undefined' ? 'undefined' : _typeof(mid)) !== undefined && mid !== null) msg.mid = mid;
  if ((typeof tenant === 'undefined' ? 'undefined' : _typeof(tenant)) !== undefined && tenant !== null) msg.tenant = tenant;
  if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== undefined && source !== null) msg.source = source;
  if ((typeof sid === 'undefined' ? 'undefined' : _typeof(sid)) !== undefined && sid !== null) msg.sid = sid;
  if ((typeof ok === 'undefined' ? 'undefined' : _typeof(ok)) !== undefined && ok !== null) msg.ok = ok;
  if ((typeof subTarget === 'undefined' ? 'undefined' : _typeof(subTarget)) !== undefined && subTarget !== null) msg.subTarget = subTarget;

  return JSON.stringify(msg);
}

function packObj(obj) {
  var msg = (0, _merge2.default)(this.baseMessage(), obj);
  return JSON.stringify(msg);
}

function unpack(textMsg) {
  return JSON.parse(textMsg);
}

function unpackVerify(textMsg) {
  // TODO: Perform validation etc here
  return unpack(textMsg);
}

exports.default = {
  pack: pack,
  packObj: packObj,
  unpack: unpack,
  unpackVerify: unpackVerify
};