// import chai from 'chai';
import test from 'tape';
// import isString from 'lodash.isstring';
import Tiip, { fields, stringFields, arrayFields, objectFields, booleanFields } from '../src';

test('Construct from Json string', t => {
  const fromJson = JSON.stringify({
    ts: '123',
    ct: '123',
    type: 'req',
    mid: '0',
    sid: 'X',
    ok: true,
    ten: 'Y',
    src: ['Z'],
    targ: ['S'],
    arg: { a: 1 },
    ch: 'C',
    sig: 'test',
    pl: [1.3, 4],
  });
  const msg = new Tiip(fromJson);
  t.ok(msg.pv === 'tiip.2.0');
  t.ok(msg.ts === '123');
  t.ok(msg.ct === '123');
  t.ok(msg.type === 'req');
  t.ok(msg.mid === '0');
  t.ok(msg.sid === 'X');
  t.ok(msg.ok === true);
  t.ok(msg.ten === 'Y');
  t.ok(msg.src[0] === 'Z');
  t.ok(msg.targ[0] === 'S');
  t.ok(msg.arg.a === 1);
  t.ok(msg.ch === 'C');
  t.ok(msg.sig === 'test');
  t.ok(msg.pl[0] === 1.3);
  t.ok(msg.pl[1] === 4);
  t.end();
});

test('Construct from Json string with bad keys', t => {
  const fromJson = JSON.stringify({
    timestamp: '123',
    something: 3,
    idk: [true, false],
  });
  t.throws(() => new Tiip(fromJson));
  t.end();
});

test('Construct from JS object', t => {
  const fromJS = {
    ts: '123',
    ct: '123',
    type: 'req',
    mid: '0',
    sid: 'X',
    ok: true,
    ten: 'Y',
    src: ['Z'],
    targ: ['S'],
    arg: { a: 1 },
    ch: 'C',
    sig: 'test',
    pl: [1.3, 4],
  };
  const msg = new Tiip(fromJS);
  t.ok(msg.pv === 'tiip.2.0');
  t.ok(msg.ts === '123');
  t.ok(msg.ct === '123');
  t.ok(msg.type === 'req');
  t.ok(msg.mid === '0');
  t.ok(msg.sid === 'X');
  t.ok(msg.ok === true);
  t.ok(msg.ten === 'Y');
  t.ok(msg.src[0] === 'Z');
  t.ok(msg.targ[0] === 'S');
  t.ok(msg.arg.a === 1);
  t.ok(msg.ch === 'C');
  t.ok(msg.sig === 'test');
  t.ok(msg.pl[0] === 1.3);
  t.ok(msg.pl[1] === 4);
  t.end();
});

test('Construct from JS object with bad keys', t => {
  const from = {
    timestamp: '123',
    something: 3,
    idk: [true, false],
  };
  t.throws(() => new Tiip(from));
  t.end();
});

fields.forEach(k => {
  if (k === 'pv') return;
  test(`Construct from Json string, bad type of: ${k}`, t => {
    t.throws(() => new Tiip(JSON.stringify({ [k]: 1 })));
    t.end();
  });
});

fields.forEach(k => {
  if (k === 'pv') return;
  test(`Construct from JS object, bad type of: ${k}`, t => {
    t.throws(() => new Tiip({ [k]: 1 }));
    t.end();
  });
});

test('toJson', t => {
  let fromJS = {
    ts: '123',
    ct: '123',
    type: 'req',
    mid: '0',
    sid: 'X',
    ok: true,
    ten: 'Y',
    src: ['Z'],
    targ: ['S'],
    arg: { a: 1 },
    ch: 'C',
    sig: 'test',
    pl: [1.3, 4],
  };
  const msg = new Tiip(fromJS);
  // console.log(msg.toJson());
  fromJS = { pv: 'tiip.2.0', ...fromJS };
  const ref = {};
  for (const k of fields) {
    ref[k] = fromJS[k];
  }
  // console.log(JSON.stringify(ref));
  t.ok(msg.toJson() === JSON.stringify(ref));
  t.end();
});

test('get/set: ts', t => {
  const msg = new Tiip();
  t.ok(msg.pv === 'tiip.2.0');
  t.ok(msg.ts);
  t.end();
});

stringFields.forEach(k => {
  if (k === 'pv') return;
  test(`get/set: ${k}`, t => {
    const msg = new Tiip();
    msg[k] = '123';
    t.ok(msg[k] === '123');
    t.throws(() => (msg[k] = 3)); // eslint-disable-line
    t.end();
  });
});

arrayFields.forEach(k => {
  test(`get/set: ${k}`, t => {
    const msg = new Tiip();
    msg[k] = ['test'];
    t.ok(msg[k][0] === 'test');
    t.throws(() => (msg[k] = 3)); // eslint-disable-line
    t.end();
  });
});

test('get/set array of strings: targ', t => {
  const msg = new Tiip();
  t.throws(() => (msg.targ = [1, 2])); // eslint-disable-line
  t.end();
});

test('get/set array of strings: src', t => {
  const msg = new Tiip();
  t.throws(() => (msg.src = [1, 2])); // eslint-disable-line
  t.end();
});

objectFields.forEach(k => {
  test(`get/set: ${k}`, t => {
    const msg = new Tiip();
    msg[k] = { a: 1 };
    t.ok(msg[k].a === 1);
    t.throws(() => (msg[k] = 3)); // eslint-disable-line
    t.end();
  });
});

booleanFields.forEach(k => {
  test(`get/set: ${k}`, t => {
    const msg = new Tiip();
    msg[k] = true;
    t.ok(msg[k] === true);
    t.throws(() => (msg[k] = 3)); // eslint-disable-line
    t.end();
  });
});

test('get/set bad key', t => {
  const msg = new Tiip();
  msg.bad = 1;
  t.ok(msg.bad === 1);
  const obj = msg.toJS();
  t.ok(obj.pv === 'tiip.2.0');
  t.ok(obj.ts);
  t.ok(obj.bad === undefined);
  t.end();
});
