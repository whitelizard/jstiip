import isString from 'lodash.isstring';
import isArray from 'lodash.isarray';
import isBoolean from 'lodash.isboolean';
import isObject from 'lodash.isobject';
import isUndefined from 'lodash.isundefined';
import hasIn from 'lodash.hasin';

const stringFields = ['mid', 'sid', 'type', 'ten', 'ch', 'sig', 'pv', 'ts', 'ct'];
const arrayFields = ['src', 'targ', 'pl'];
const objectFields = ['arg'];
const booleanFields = ['ok'];
const mandatoryFields = ['pv', 'ts'];

export const fields = [...stringFields, ...arrayFields, ...objectFields, ...booleanFields];

function baseMessage() {
  return {
    pv: 'tiip.2.0',
    ts: String(Date.now() / 1000),
  };
}

// function isDef(value) {
//   return typeof value !== 'undefined';
// }
//
// export function pack({ type, targ, sig, arg, pl, mid, ten, src, ch, sid, ok }) {
//   const msg = baseMessage();
//
//   if (isDef(type)) msg.type = type;
//   if (isDef(targ)) msg.targ = targ;
//   if (isDef(sig)) msg.sig = sig;
//   if (isDef(arg)) msg.arg = arg;
//   if (isDef(pl)) msg.pl = pl;
//   if (isDef(mid)) msg.mid = mid;
//   if (isDef(ten)) msg.ten = ten;
//   if (isDef(src)) msg.src = src;
//   if (isDef(ch)) msg.ch = ch;
//   if (isDef(sid)) msg.sid = sid;
//   if (isDef(ok)) msg.ok = ok;
//
//   return JSON.stringify(msg);
// }
//
// export function packObj(obj) {
//   const msg = { ...baseMessage(), ...obj };
//   return JSON.stringify(msg);
// }
//
// export function unpack(textMsg) {
//   return JSON.parse(textMsg);
// }
//
// export function unpackVerify(textMsg) {
//   // TODO: Perform validation etc here
//   return unpack(textMsg);
// }

export function verifyKeyTypes(tiip) {
  stringFields.forEach(k => {
    if (!isUndefined(tiip[k]) && !isString(tiip[k])) {
      throw new TypeError(`'${k}' should be a String`);
    }
  });
  arrayFields.forEach(k => {
    if (!isUndefined(tiip[k]) && !isArray(tiip[k])) {
      throw new TypeError(`'${k}' should be an Array`);
    }
    // if (k === 'targ' || k === 'src') {
    //
    // }
  });
  objectFields.forEach(k => {
    if (!isUndefined(tiip[k]) && !isObject(tiip[k])) {
      throw new TypeError(`'${k}' should be an Object`);
    }
  });
  booleanFields.forEach(k => {
    if (!isUndefined(tiip[k]) && !isBoolean(tiip[k])) {
      throw new TypeError(`'${k}' should be a boolean`);
    }
  });
}

export function verifyVersion(tiip) {
  if (tiip.pv !== 'tiip.2.0') throw new Error('Wrong protocol version');
}

export function verifyMandatory(tiip) {
  if (!mandatoryFields.every(k => hasIn(tiip, k))) throw new TypeError('Mandatory field missing');
}

export function verify(tiip) {
  verifyKeyTypes(tiip);
  verifyMandatory(tiip);
  verifyVersion(tiip);
}

export default class Tiip {
  constructor(from) {
    this._type = '';
    if (isString(from)) {
      const obj = JSON.parse(from);
      verify(obj);
      this._type = obj.type;
    } else if (isObject(from)) {
      verify(from);
      this._type = from.type;
    }
  }
  get type() {
    return this._type;
  }
  set type(t) {
    this._type = t;
  }
}
