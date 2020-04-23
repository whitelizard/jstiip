import omit from 'lodash.omit';

import TiipV3, { pv as tiipV3Pv } from './v3';
import TiipV2, { pv as tiipV2Pv } from './v2';

export const fromEpochToISOTs = (epochTs) =>
  new Date(Number(epochTs) * 1000).toISOString().replace(/\.[0-9]+Z/, `.${epochTs.split('.')[1]}Z`);

export const fromISOToEpochTs = (isoTs) =>
  String(new Date(isoTs).getTime() / 1000).replace(
    /\.[0-9]+$/,
    `.${isoTs.split('.')[1].replace('Z', '')}`,
  );

export const v2ToV3 = (tiipV2Msg) => {
  let tiipMsg = tiipV2Msg.toJS();
  if (tiipMsg.ct) {
    tiipMsg.lat = String(Number(tiipMsg.ts) - Number(tiipMsg.ct));
    tiipMsg.ts = fromEpochToISOTs(tiipMsg.ct);
    tiipMsg = omit(tiipMsg, ['ct']);
  } else {
    tiipMsg.ts = fromEpochToISOTs(tiipMsg.ts);
  }
  tiipMsg.pv = tiipV3Pv;
  return new TiipV3(tiipMsg, true);
};

export const v3ToV2 = (tiipV3Msg) => {
  let tiipMsg = tiipV3Msg.toJS();
  if (tiipMsg.lat) {
    tiipMsg.ct = fromISOToEpochTs(tiipMsg.ts);
    tiipMsg.ts = String(Number(tiipMsg.ct) + Number(tiipMsg.lat));
    tiipMsg = omit(tiipMsg, ['lat']);
  } else {
    tiipMsg.ts = fromISOToEpochTs(tiipMsg.ts);
  }
  tiipMsg.pv = tiipV2Pv;
  return new TiipV2(tiipMsg, true);
};
