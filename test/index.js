// import chai from 'chai';
import test from 'tape';
// import isString from 'lodash.isstring';
import Tiip, { fields } from '../src';

test('From Json string', t => {
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
  t.end();
});

test('From Json string including', t => {
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
  t.ok(msg);
  t.end();
});

test('From Json string, bad type of `type`', t => {
  const fromJson = JSON.stringify({ type: 1 });
  t.throws(() => new Tiip(fromJson));
  t.end();
});

test('From JS object', t => {
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
  t.ok(msg);
  t.end();
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
  console.log(msg.toJson());
  fromJS = { pv: 'tiip.2.0', ...fromJS };
  console.log(JSON.stringify(fromJS));
  const ref = {};
  for (const k of fields) {
    ref[k] = fromJS[k];
  }
  t.ok(msg.toJson() === JSON.stringify(ref));
  t.end();
});

//
// const msg = tiip.unpack(tiip.pack('req', 'conf', 'function', { a: 1 }));
//
// chai
//   .expect(msg)
//   .to.have.property('type')
//   .and.equal('req');
// chai
//   .expect(msg)
//   .to.have.property('target')
//   .and.equal('conf');
// chai
//   .expect(msg)
//   .to.have.property('signal')
//   .and.equal('function');
// chai
//   .expect(msg)
//   .to.have.property('arguments')
//   .and.equal({ a: 1 });
