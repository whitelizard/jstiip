
function baseMessage() {
  return {
    protocol: 'tiip.0.9',
    timestamp: Date.now()/1000+''
  };
}

export function pack(
  type, target, signal, arguments_, payload,
  mid, tenant, source, sid, ok, subTarget
) {
  let msg = baseMessage();

  if (typeof type !== undefined && type !== null) msg.type = type;
  if (typeof target !== undefined && target !== null) msg.target = target;
  if (typeof signal !== undefined && signal !== null) msg.signal = signal;
  if (typeof arguments_ !== undefined && arguments_ !== null) msg.arguments = arguments_;
  if (typeof payload !== undefined && payload !== null) msg.payload = payload;
  if (typeof mid !== undefined && mid !== null) msg.mid = mid;
  if (typeof tenant !== undefined && tenant !== null) msg.tenant = tenant;
  if (typeof source !== undefined && source !== null) msg.source = source;
  if (typeof sid !== undefined && sid !== null) msg.sid = sid;
  if (typeof ok !== undefined && ok !== null) msg.ok = ok;
  if (typeof subTarget !== undefined && subTarget !== null) msg.subTarget = subTarget;

  return JSON.stringify(msg);
}

export function packObj(obj) {
  const msg = { ...this.baseMessage(), ...obj };
  return JSON.stringify(msg);
}

export function unpack(textMsg) {
  return JSON.parse(textMsg);
}

export function unpackVerify(textMsg) {
  // TODO: Perform validation etc here
  return unpack(textMsg);
}

export default {
  pack,
  packObj,
  unpack,
  unpackVerify,
};
