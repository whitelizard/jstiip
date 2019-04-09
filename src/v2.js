import isString from 'lodash.isstring';
// import isArray from 'lodash.isarray';
import isBoolean from 'lodash.isboolean';
import isObject from 'lodash.isobject';
import isUndefined from 'lodash.isundefined';
import hasIn from 'lodash.hasin';

const μsProcessStart = Date.now() * 1e3;
const hrTimeProcessStart = global.process && process.hrtime && process.hrtime();
const μs =
  global.process && process.hrtime
    ? () => {
      // const hr = process.hrtime();
      const hr = process.hrtime(hrTimeProcessStart);
      return μsProcessStart + (hr[0] * 1e9 + hr[1]) / 1e3;
    }
    : () => Date.now() * 1e3;

export const version = '2.0';
export const pv = `tiip.${version}`;
export const stringFields = ['pv', 'ts', 'ct', 'ten', 'sid', 'mid', 'type', 'ch', 'sig'];
export const arrayFields = ['src', 'targ', 'pl'];
export const objectFields = ['arg'];
export const booleanFields = ['ok'];
// const mandatoryFields = ['pv', 'ts'];

export const fields = [...stringFields, ...arrayFields, ...objectFields, ...booleanFields];

export const ts = () => String(μs() / 1e6);

export function verifyTypes(tiip) {
  for (const k of stringFields) {
    if (!isUndefined(tiip[k]) && !isString(tiip[k])) {
      throw new TypeError(`'${k}' should be a String`);
    }
  }
  if (!isUndefined(tiip.src)) {
    if (!Array.isArray(tiip.src)) throw new TypeError("'src' should be an Array");
    if (!tiip.src.every(isString)) throw new TypeError("'src' should contain strings");
  }
  if (!isUndefined(tiip.targ)) {
    if (!Array.isArray(tiip.targ)) throw new TypeError("'targ' should be an Array");
    if (!tiip.targ.every(isString)) throw new TypeError("'targ' should contain strings");
  }
  if (!isUndefined(tiip.pl) && !Array.isArray(tiip.pl)) {
    throw new TypeError("'pl' should be an Array");
  }
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

export function verifyValidKeys(tiip) {
  if (!Object.keys(tiip).every(k => fields.includes(k))) throw new Error('Bad key');
}

export function verify(tiip) {
  verifyValidKeys(tiip);
  verifyMandatory(tiip);
  verifyVersion(tiip);
  verifyTypes(tiip);
}

export default class Tiip {
  constructor(from, loadingTiip) {
    if (isString(from)) {
      this.fromJS(JSON.parse(from), loadingTiip);
    } else if (isObject(from)) {
      this.fromJS(from, loadingTiip);
    } else {
      this.fromJS({});
    }
  }
  fromJson(str, loadingTiip) {
    this.fromJS(JSON.parse(str), loadingTiip);
  }
  fromJS(obj, loadingTiip) {
    if (!loadingTiip) {
      obj.pv = pv; // eslint-disable-line
      if (isUndefined(obj.ts)) obj.ts = ts(); // eslint-disable-line
    }
    verify(obj);
    for (const k of fields) {
      if (!isUndefined(obj[k])) {
        this[`_$${k}`] = obj[k];
      }
    }
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
  get sid() {
    return this._$sid;
  }
  get mid() {
    return this._$mid;
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
  get ch() {
    return this._$ch;
  }
  get ok() {
    return this._$ok;
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
  set ts(v) {
    if (!isString(v)) throw new TypeError("'type' should be a String");
    this._$ts = v;
  }
  set ct(v) {
    if (!isString(v)) throw new TypeError("'ct' should be a String");
    this._$ct = v;
  }
  set type(v) {
    if (!isString(v)) throw new TypeError("'type' should be a String");
    this._$type = v;
  }
  set sid(v) {
    if (!isString(v)) throw new TypeError("'sid' should be a String");
    this._$sid = v;
  }
  set mid(v) {
    if (!isString(v)) throw new TypeError("'mid' should be a String");
    this._$mid = v;
  }
  set ten(v) {
    if (!isString(v)) throw new TypeError("'ten' should be a String");
    this._$ten = v;
  }
  set targ(v) {
    if (!Array.isArray(v)) throw new TypeError("'targ' should be an Array");
    if (!v.every(isString)) throw new TypeError("'targ' should contain strings");
    this._$targ = v;
  }
  set src(v) {
    if (!Array.isArray(v)) throw new TypeError("'src' should be an Array");
    if (!v.every(isString)) throw new TypeError("'src' should contain strings");
    this._$src = v;
  }
  set ch(v) {
    if (!isString(v)) throw new TypeError("'ch' should be a String");
    this._$ch = v;
  }
  set ok(v) {
    if (!isBoolean(v)) throw new TypeError("'ok' should be a boolean");
    this._$ok = v;
  }
  set sig(v) {
    if (!isString(v)) throw new TypeError("'sig' should be a String");
    this._$sig = v;
  }
  set arg(v) {
    if (!isObject(v)) throw new TypeError("'arg' should be an Object");
    this._$arg = v;
  }
  set pl(v) {
    if (!Array.isArray(v)) throw new TypeError("'pl' should be an Array");
    this._$pl = v;
  }
  tsUpdate() {
    this._$ts = ts();
  }
  ctUpdate() {
    this._$ct = ts();
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
