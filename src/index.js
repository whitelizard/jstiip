import isString from 'lodash.isstring';
import isArray from 'lodash.isarray';
import isBoolean from 'lodash.isboolean';
import isObject from 'lodash.isobject';
import isUndefined from 'lodash.isundefined';
import hasIn from 'lodash.hasin';

const version = '2.0';
const pv = `tiip.${version}`;
const stringFields = ['pv', 'ts', 'ct', 'ten', 'sid', 'mid', 'type', 'ch', 'sig'];
const arrayFields = ['src', 'targ', 'pl'];
const objectFields = ['arg'];
const booleanFields = ['ok'];
// const mandatoryFields = ['pv', 'ts'];

export const fields = [...stringFields, ...arrayFields, ...objectFields, ...booleanFields];

const ts = () => String(Date.now() / 1000);
// const baseMessage = () => ({ pv, ts: ts() });

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
  get type() {
    return this._$_type;
  }
  set type(t) {
    this._$_type = t;
  }
  get pv() {
    return this._$_pv;
  }
  set pv(t) {
    this._$_pv = t;
  }
  toJson() {
    return JSON.stringify(this).replace(/_\$_/g, '');
  }
}
