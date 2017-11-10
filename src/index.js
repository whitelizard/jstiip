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
  verifyMandatory(tiip);
  verifyVersion(tiip);
  verifyTypes(tiip);
}

export default class Tiip {
  constructor(from) {
    if (isString(from)) {
      this.fromJS(JSON.parse(from));
    } else if (isObject(from)) {
      this.fromJS(from);
    } else {
      this.fromJS({});
    }
  }
  fromJS(obj) {
    obj.pv = pv; // eslint-disable-line
    if (isUndefined(obj.ts)) obj.ts = ts(); // eslint-disable-line
    verify(obj);
    for (const k of fields) {
      if (!isUndefined(obj[k])) {
        this[`_$${k}`] = obj[k];
      }
    }
  }
  fromJson(str) {
    this.fromJS(JSON.parse(str));
  }
  tsUpdate() {
    this._$ts = ts();
  }
  ctUpdate() {
    this._$ct = ts();
  }
  get pv() {
    return this._$pv;
  }
  get ts() {
    return this._$ts;
  }
  get ct() {
    return this._$ct;
  }
  get type() {
    return this._$type;
  }
  get mid() {
    return this._$mid;
  }
  get sid() {
    return this._$sid;
  }
  get ten() {
    return this._$ten;
  }
  get targ() {
    return this._$targ;
  }
  get src() {
    return this._$src;
  }
  get ok() {
    return this._$ok;
  }
  get ch() {
    return this._$ch;
  }
  get sig() {
    return this._$sig;
  }
  get arg() {
    return this._$arg;
  }
  get pl() {
    return this._$pl;
  }
  set pv(v) {
    throw new TypeError("'pv' is not writable");
  }
  set type(v) {
    if (!isString(v)) throw new TypeError("'type' should be a String");
    this._$type = v;
  }
  set ts(v) {
    if (!isString(v)) throw new TypeError("'type' should be a String");
    this._$ts = v;
  }
  set ct(v) {
    if (!isString(v)) throw new TypeError("'ct' should be a String");
    this._$ct = v;
  }
  set ten(v) {
    if (!isString(v)) throw new TypeError("'ten' should be a String");
    this._$ten = v;
  }
  set sid(v) {
    if (!isString(v)) throw new TypeError("'sid' should be a String");
    this._$sid = v;
  }
  set mid(v) {
    if (!isString(v)) throw new TypeError("'mid' should be a String");
    this._$mid = v;
  }
  set ch(v) {
    if (!isString(v)) throw new TypeError("'ch' should be a String");
    this._$ch = v;
  }
  set sig(v) {
    if (!isString(v)) throw new TypeError("'sig' should be a String");
    this._$sig = v;
  }
  set ok(v) {
    if (!isBoolean(v)) throw new TypeError("'ok' should be a boolean");
    this._$ok = v;
  }
  set targ(v) {
    if (!isArray(v)) throw new TypeError("'targ' should be an Array");
    if (!v.every(isString)) throw new TypeError("'targ' should contain strings");
    this._$targ = v;
  }
  set src(v) {
    if (!isArray(v)) throw new TypeError("'src' should be an Array");
    if (!v.every(isString)) throw new TypeError("'src' should contain strings");
    this._$src = v;
  }
  set pl(v) {
    if (!isArray(v)) throw new TypeError("'pl' should be an Array");
    this._$pl = v;
  }
  set arg(v) {
    if (!isObject(v)) throw new TypeError("'arg' should be an Object");
    this._$arg = v;
  }
  toJS() {
    const obj = {};
    for (const k of fields) {
      if (!isUndefined(this[`_$${k}`])) {
        obj[k] = this[`_$${k}`];
      }
    }
    return obj;
  }
  toJson() {
    return JSON.stringify(this.toJS());
  }
}
