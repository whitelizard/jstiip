import test from 'tape';
import omit from 'lodash.omit';
import TiipV2 from '../src/v2';
import TiipV3 from '../src/v3';
import { v2ToV3 } from '../src/conversion';

export const runTests = () => {
  test('V2 -> V3', t => {
    const v2TestData = {
      ct: String(Date.now() / 1000.0),
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
    Object.keys(omit(v2TestData, ['ct'])).forEach(k => {
      t.same(tiipV3Msg[k], v2TestData[k]);
    });
    t.same(new Date(tiipV3Msg.ts), new Date(Number(v2TestData.ct) * 1000));
    t.end();
  });
};
