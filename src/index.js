import isString from 'lodash.isstring';
import isArray from 'lodash.isarray';
import isBoolean from 'lodash.isboolean';
import isObject from 'lodash.isobject';
import isUndefined from 'lodash.isundefined';
import hasIn from 'lodash.hasin';

export const version = '2.0';
export const pv = `tiip.${version}`;
export const stringFields = ['pv', 'ts', 'ct', 'ten', 'sid', 'mid', 'type', 'ch', 'sig'];
export const arrayFields = ['src', 'targ', 'pl'];
export const objectFields = ['arg'];
export const booleanFields = ['ok'];
// const mandatoryFields = ['pv', 'ts'];

export const fields = [...stringFields, ...arrayFields, ...objectFields, ...booleanFields];

export const ts = () => String(Date.now() / 1000);

export function verifyTypes(tiip) {
  for (const k of stringFields) {
    if (!isUndefined(tiip[k]) && !isString(tiip[k])) {
      throw new TypeError(`'${k}' should be a String`);
    }
  }
  if (!isUndefined(tiip.src)) {
    if (!isArray(tiip.src)) throw new TypeError("'src' should be an Array");
    if (!tiip.src.every(isString)) throw new TypeError("'src' should contain strings");
  }
  if (!isUndefined(tiip.targ)) {
    if (!isArray(tiip.targ)) throw new TypeError("'targ' should be an Array");
    if (!tiip.targ.every(isString)) throw new TypeError("'targ' should contain strings");
  }
  if (!isUndefined(tiip.pl) && !isArray(tiip.pl)) throw new TypeError("'pl' should be an Array");
  if (!isUndefined(tiip.arg) && !isObject(tiip.arg)) {
    throw new TypeError("'arg' should be an Array");
  }
  if (!isUndefined(tiip.ok) && !isBoolean(tiip.ok)) throw new TypeError("'ok' should be an Array");

  // if (k === 'targ' || k === 'src') {
  //
  // }
}

export function verifyVersion(tiip) {
  if (tiip.pv !== 'tiip.2.0') throw new Error('Wrong protocol version');
}

export function verifyMandatory(tiip) {
  // if (!mandatoryFields.every(k => hasIn(tiip, k)))
  //   throw new TypeError('Mandatory field missing');
  if (!hasIn(tiip, 'pv') || !hasIn(tiip, 'ts')) throw new TypeError('Mandatory field missing');
}

export function verify(tiip) {
  verifyTypes(tiip);
  verifyMandatory(tiip);
  verifyVersion(tiip);
}

export default class Tiip {
  constructor(from) {
    let obj = {};
    if (isString(from)) {
      obj = JSON.parse(from);
    } else if (isObject(from)) {
      obj = from;
    }
    obj.pv = pv;
    if (isUndefined(obj.ts)) obj.ts = ts();
    verify(obj);
    this._$_pv = obj.pv;
    for (const k of fields) {
      if (!isUndefined(obj[k])) {
        this[`_$_${k}`] = obj[k];
      }
    }
  }
  tsUpdate() {
    this._$_ts = ts();
  }
  ctUpdate() {
    this._$_ct = ts();
  }
  get pv() {
    return this._$_pv;
  }
  get ts() {
    return this._$_ts;
  }
  get ct() {
    return this._$_ct;
  }
  get type() {
    return this._$_type;
  }
  get mid() {
    return this._$_mid;
  }
  get sid() {
    return this._$_sid;
  }
  get ten() {
    return this._$_ten;
  }
  get targ() {
    return this._$_targ;
  }
  get src() {
    return this._$_src;
  }
  get ok() {
    return this._$_ok;
  }
  get ch() {
    return this._$_ch;
  }
  get sig() {
    return this._$_sig;
  }
  get arg() {
    return this._$_arg;
  }
  get pl() {
    return this._$_pl;
  }
  set pv(v) {
    throw new TypeError("'pv' is not writable");
  }
  set type(v) {
    if (!isString(v)) {
      throw new TypeError("'type' should be a String");
    }
    this._$_type = v;
  }
  set ts(v) {
    if (!isString(v)) {
      throw new TypeError("'type' should be a String");
    }
    this._$_ts = v;
  }
  set ct(v) {
    if (!isString(v)) {
      throw new TypeError("'ct' should be a String");
    }
    this._$_ct = v;
  }
  set ten(v) {
    if (!isString(v)) {
      throw new TypeError("'ten' should be a String");
    }
    this._$_ten = v;
  }
  set sid(v) {
    if (!isString(v)) {
      throw new TypeError("'sid' should be a String");
    }
    this._$_sid = v;
  }
  set mid(v) {
    if (!isString(v)) {
      throw new TypeError("'mid' should be a String");
    }
    this._$_mid = v;
  }
  set ch(v) {
    if (!isString(v)) {
      throw new TypeError("'ch' should be a String");
    }
    this._$_ch = v;
  }
  set sig(v) {
    if (!isString(v)) {
      throw new TypeError("'sig' should be a String");
    }
    this._$_sig = v;
  }
  set ok(v) {
    if (!isBoolean(v)) {
      throw new TypeError("'ok' should be a boolean");
    }
    this._$_ok = v;
  }
  set targ(v) {
    if (!isArray(v)) {
      throw new TypeError("'targ' should be an Array");
    }
    this._$_targ = v;
  }
  set src(v) {
    if (!isArray(v)) {
      throw new TypeError("'src' should be an Array");
    }
    this._$_src = v;
  }
  set pl(v) {
    if (!isArray(v)) {
      throw new TypeError("'pl' should be an Array");
    }
    this._$_pl = v;
  }
  set arg(v) {
    if (!isObject(v)) {
      throw new TypeError("'arg' should be an Object");
    }
    this._$_arg = v;
  }
  toJson() {
    return JSON.stringify(this).replace(/_\$_/g, '');
  }
}
