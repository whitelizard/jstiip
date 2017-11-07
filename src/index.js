import isString from 'lodash.isstring';
import isArray from 'lodash.isarray';
import isBoolean from 'lodash.isboolean';
import isObject from 'lodash.isobject';
import isUndefined from 'lodash.isundefined';
import hasIn from 'lodash.hasin';

const version = '2.0';
const pv = `tiip.${version}`;
const stringFields = ['mid', 'sid', 'type', 'ten', 'ch', 'sig', 'pv', 'ts', 'ct'];
const arrayFields = ['src', 'targ', 'pl'];
const objectFields = ['arg'];
const booleanFields = ['ok'];
const mandatoryFields = ['pv', 'ts'];

export const fields = [...stringFields, ...arrayFields, ...objectFields, ...booleanFields];

const ts = () => String(Date.now() / 1000);
const baseMessage = () => ({ pv, ts: ts() });

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
}

export default class Tiip {
  constructor(from) {
    this._$_pv = pv;
    if (isString(from)) {
      const obj = JSON.parse(from);
      if (isUndefined(obj.ts)) obj.ts = ts();
      verify(obj);
      this._$_type = obj.type;
    } else if (isObject(from)) {
      if (isUndefined(from.ts)) from.ts = ts(); // eslint-disable-line
      verify(from);
      this._$_type = from.type;
    }
  }
  get type() {
    return this._$_type;
  }
  set type(t) {
    this._$_type = t;
  }
  toJson() {
    return JSON.stringify(this).replace(/_\$_/g, '');
  }
}
