import test from 'tape';
import Tiip, { fields, stringFields, arrayFields, objectFields, booleanFields, pv } from '../src';

test('Construct from Json string', t => {
  const fromJson = JSON.stringify({
    ts: '2019-04-08T19:32:32.123456Z',
    ct: '2019-04-08T19:32:32.123456Z',
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
  let msg = new Tiip(fromJson);
  t.ok(msg.pv === pv);
  t.ok(msg.ts === '2019-04-08T19:32:32.123456Z');
  t.ok(msg.ct === '2019-04-08T19:32:32.123456Z');
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
  msg = new Tiip();
  msg.fromJson(fromJson);
  t.ok(msg.pv === pv);
  t.ok(msg.ts === '2019-04-08T19:32:32.123456Z');
  t.ok(msg.ct === '2019-04-08T19:32:32.123456Z');
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
  const msg = new Tiip();
  t.throws(() => msg.fromJson(fromJson));
  t.end();
});

test('Construct from JS object', t => {
  const fromJS = {
    ts: '2019-04-08T19:32:32.123456Z',
    ct: '2019-04-08T19:32:32.123456Z',
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
  let msg = new Tiip(fromJS);
  t.ok(msg.pv === pv);
  t.ok(msg.ts === '2019-04-08T19:32:32.123456Z');
  t.ok(msg.ct === '2019-04-08T19:32:32.123456Z');
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
  msg = new Tiip();
  msg.fromJS(fromJS);
  t.ok(msg.pv === pv);
  t.ok(msg.ts === '2019-04-08T19:32:32.123456Z');
  t.ok(msg.ct === '2019-04-08T19:32:32.123456Z');
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
  const msg = new Tiip();
  t.throws(() => msg.fromJS(from));
  t.end();
});

test('Construct from Tiip, with bad keys/values', t => {
  let from = {
    pv: 'tiip.0.0', // wrong version
    ts: '2019-04-08T19:32:32.123456Z',
  };
  t.throws(() => new Tiip(from, true));
  let msg = new Tiip();
  t.throws(() => msg.fromJS(from, true));
  t.throws(() => msg.fromJSon(JSON.stringify(from), true));
  from = {
    pv, // no ts
  };
  t.throws(() => new Tiip(from, true));
  msg = new Tiip();
  t.throws(() => msg.fromJS(from, true));
  t.throws(() => msg.fromJSon(JSON.stringify(from), true));
  from = {
    ts: '2019-04-08T19:32:32.123456Z', // no pv
  };
  t.throws(() => new Tiip(from, true));
  msg = new Tiip();
  t.throws(() => msg.fromJS(from, true));
  t.throws(() => msg.fromJSon(JSON.stringify(from), true));
  from = {
    pv,
    ts: 1, // wrong type
  };
  t.throws(() => new Tiip(from, true));
  msg = new Tiip();
  t.throws(() => msg.fromJS(from, true));
  t.throws(() => msg.fromJSon(JSON.stringify(from), true));
  t.end();
});

fields.forEach(k => {
  if (k === 'pv') return;
  test(`Construct from Json string, bad type of: ${k}`, t => {
    t.throws(() => new Tiip(JSON.stringify({ [k]: 1 })));
    const msg = new Tiip();
    t.throws(() => msg.fromJson(JSON.stringify({ [k]: 1 })));
    t.end();
  });
});

fields.forEach(k => {
  if (k === 'pv') return;
  test(`Construct from JS object, bad type of: ${k}`, t => {
    t.throws(() => new Tiip({ [k]: 1 }));
    const msg = new Tiip();
    t.throws(() => msg.fromJS({ [k]: 1 }));
    t.end();
  });
});

test('toJson', t => {
  let fromJS = {
    ts: '2019-04-08T19:32:32.123456Z',
    ct: '2019-04-08T19:32:32.123456Z',
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
  fromJS = { pv, ...fromJS };
  const ref = {};
  for (const k of fields) {
    ref[k] = fromJS[k];
  }
  // console.log(JSON.stringify(ref));
  t.ok(msg.toJson() === JSON.stringify(ref));
  t.end();
});

test('get/set: ts & ct', t => {
  const msg = new Tiip();
  t.ok(msg.pv === pv);
  t.ok(msg.ts);
  t.ok(typeof msg.ts === 'string');
  msg.tsUpdate();
  t.ok(Math.abs(new Date(msg.ts) - Date.now()) < 10); // diff < 10ms
  t.ok(typeof msg.ts === 'string');
  msg.ts = new Date().toISOString();
  t.throws(() => {
    msg.ts = 'Incorrect ISO 6801 date';
  });
  msg.ctUpdate();
  t.ok(msg.ct);
  msg.ct = new Date().toISOString();
  t.throws(() => {
    msg.ct = 'Incorrect ISO 6801 date';
  });
  t.end();
});

stringFields.forEach(k => {
  if (['pv'].includes(k)) return;
  test(`get/set: ${k}`, t => {
    const msg = new Tiip();
    msg[k] = '123';
    t.ok(msg[k] === '123');
    t.throws(() => {
      msg[k] = 3;
    });
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
  t.ok(obj.pv === pv);
  t.ok(obj.ts);
  t.ok(obj.bad === undefined);
  t.end();
});
