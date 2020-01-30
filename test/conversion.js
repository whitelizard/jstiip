import { test } from 'tap';
import omit from 'lodash.omit';
import TiipV2 from '../src/v2';
import TiipV3 from '../src/v3';
import { v2ToV3, v3ToV2, fromISOToEpochTs, fromEpochToISOTs } from '../src/conversion';

test('ISO<->Epoch Ts Conversion', t => {
  const ts = '2019-04-15T22:04:15.123456789Z';
  const epochTs = fromISOToEpochTs(ts);
  t.equals(epochTs.split('.')[1], ts.split('.')[1].replace('Z', ''));
  const isoTs = fromEpochToISOTs(epochTs);
  t.equals(isoTs, ts);
  t.end();
});

test('V2 -> V3', t => {
  const v2TestData = {
    ts: '1555368175.123456789',
    ct: '1555368174.123456789',
    mid: 'testMid',
    sid: 'testSid',
    type: 'testType',
    ok: true,
    ten: 'testTenant',
    src: ['testSrc1', 'testSrc2'],
    targ: ['testTarg1', 'testTarg2'],
    arg: { arg1: 'val1', arg2: 2, arg3: true },
    ch: 'testChannel',
    sig: 'testSignal',
    pl: ['test', 1, true],
  };
  const tiipV2Msg = new TiipV2({ ...v2TestData });
  const tiipV3Msg = v2ToV3(tiipV2Msg);
  t.ok(tiipV3Msg instanceof TiipV3);
  Object.keys(omit(v2TestData, ['ct', 'ts'])).forEach(k => {
    t.same(tiipV3Msg[k], v2TestData[k]);
  });
  t.same(new Date(tiipV3Msg.ts), new Date(Number(v2TestData.ct) * 1000));
  t.same(tiipV3Msg.lat, '1');
  t.end();
});

test('V3 -> V2', t => {
  const v3TestData = {
    ts: '2019-04-15T22:04:15.123456789Z',
    lat: '1',
    mid: 'testMid',
    sid: 'testSid',
    type: 'testType',
    ok: true,
    ten: 'testTenant',
    src: ['testSrc1', 'testSrc2'],
    targ: ['testTarg1', 'testTarg2'],
    arg: { arg1: 'val1', arg2: 2, arg3: true },
    ch: 'testChannel',
    sig: 'testSignal',
    pl: ['test', 1, true],
  };
  const tiipV3Msg = new TiipV3({ ...v3TestData });
  const tiipV2Msg = v3ToV2(tiipV3Msg);
  t.ok(tiipV2Msg instanceof TiipV2);
  Object.keys(omit(v3TestData, ['lat', 'ts'])).forEach(k => {
    t.same(tiipV2Msg[k], v3TestData[k]);
  });
  t.same(new Date(Number(tiipV2Msg.ct) * 1000), new Date(v3TestData.ts));
  t.equals(Number(tiipV2Msg.ct) + Number(v3TestData.lat), Number(tiipV2Msg.ts));
  t.end();
});
