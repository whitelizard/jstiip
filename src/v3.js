import isString from 'lodash.isstring';
// import isArray from 'lodash.isarray';
import isBoolean from 'lodash.isboolean';
import isObject from 'lodash.isobject';
import isUndefined from 'lodash.isundefined';
import hasIn from 'lodash.hasin';

const nsProcessStart = Date.now() * 1e6;
const hrTimeProcessStart = global.process && process.hrtime && process.hrtime();
const ns =
  global.process && process.hrtime
    ? () => {
        // const hr = process.hrtime();
        const hr = process.hrtime(hrTimeProcessStart);
        return nsProcessStart + (hr[0] * 1e9 + hr[1]);
      }
    : () => Date.now() * 1e6;

export const version = '3.0';
export const pv = `tiip.${version}`;
export const timestampFields = ['ts'];
export const stringFields = ['lat', 'pv', 'ten', 'sid', 'mid', 'type', 'ch', 'sig'];
export const arrayFields = ['src', 'targ', 'pl'];
export const objectFields = ['arg'];
export const booleanFields = ['ok'];
// const mandatoryFields = ['pv', 'ts'];

export const fields = [
  ...timestampFields,
  ...stringFields,
  ...arrayFields,
  ...objectFields,
  ...booleanFields,
];

export const ts = () => {
  const nsTime = ns();
  const extraDigits = String(nsTime)
    .substr(-6)
    .replace(/0+$/, ''); // remove trailing zeros
  // Note: Since toISOString() is fixed, returning trailing zeros, the extra digits can be appended.
  return new Date(nsTime / 1e6).toISOString().replace('Z', `${extraDigits}Z`);
};

const isISO6801Timestamp = tsString =>
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(tsString);

export function verifyTypes(tiip) {
  for (const k of timestampFields) {
    if (!isUndefined(tiip[k]) && !isISO6801Timestamp(tiip[k])) {
      throw new TypeError(`'${k}' should be a correct ISO 6801 date string (${tiip[k]})`);
    }
  }
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
  if (tiip.pv !== pv) throw new Error('Wrong protocol version');
}

export function verifyMandatory(tiip) {
  if (!hasIn(tiip, 'pv') || !hasIn(tiip, 'ts')) throw new TypeError('Mandatory field missing');
}

export function verifyValidKeys(tiip) {
  Object.keys(tiip).forEach(k => {
    if (!fields.includes(k)) throw new Error(`Bad key: "${k}"`);
  });
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
    let newObj = obj;
    if (!loadingTiip) {
      newObj = { ...obj, pv };
      if (isUndefined(obj.ts)) newObj.ts = ts();
    }
    verify(newObj);
    for (const k of fields) {
      if (!isUndefined(newObj[k])) {
        this[`_$${k}`] = newObj[k];
      }
    }
  }

  get pv() {
    return this._$pv;
  }

  get ts() {
    return this._$ts;
  }

  get lat() {
    return this._$lat;
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
    if (!isISO6801Timestamp(v)) {
      throw new TypeError("'ts' should be a correct ISO 6801 date string");
    }
    this._$ts = v;
  }

  set lat(v) {
    if (!isString(v)) throw new TypeError("'lat' should be a String");
    this._$lat = v;
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

  latUpdate() {
    this._$lat = String((Date.now() - new Date(this._$ts)) / 1000);
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
