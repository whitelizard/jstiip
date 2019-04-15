import omit from 'lodash.omit';

import TiipV3, { pv as tiipV3Pv } from './v3';

const fromEpochToISOTs = epochTs =>
  new Date(Number(epochTs) * 1000).toISOString().replace(/\.[0-9]+Z/, `.${epochTs.split('.')[1]}Z`);

export const v2ToV3 = tiipV2Msg => {
  let tiipMsg = tiipV2Msg.toJS();
  if (tiipMsg.ct) {
    tiipMsg.ts = fromEpochToISOTs(tiipMsg.ct);
    tiipMsg = omit(tiipMsg, ['ct']);
  } else {
    tiipMsg.ts = fromEpochToISOTs(tiipMsg.ts);
  }
  tiipMsg.pv = tiipV3Pv;
  return new TiipV3(tiipMsg, true);
};
