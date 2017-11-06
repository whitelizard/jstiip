// import chai from 'chai';
import test from 'tape';
import Tiip from '../src';

function verifyAllKeyTypes(t, tiip) {
  t.ok(Array.isArray(tiip.pl));
}

test('From Json string', t => {
  const fromJson = JSON.stringify({
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
  verifyAllKeyTypes(t, msg);
});

test('From Json string, bad key', t => {
  const fromJson = JSON.stringify({ type: 1 });
  t.throws(new Tiip(fromJson));
});

test('From JS object', t => {
  const fromJS = {
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
  verifyAllKeyTypes(t, msg);
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
