export const fields = [
  'type', 'target', 'signal', 'arguments', 'payload',
  'mid', 'tenant', 'source', 'sid', 'ok', 'subTarget',
];

function baseMessage() {
  return {
    protocol: 'tiip.1.0',
    timestamp: String(Date.now() / 1000),
  };
}

export function isDef(value) {
  return typeof value !== undefined && value !== null;
}

export function pack(
  type, target, signal, arguments_, payload,
  mid, tenant, source, sid, ok, subTarget
) {
  const msg = baseMessage();

  if (isDef(type)) msg.type = type;
  if (isDef(target)) msg.target = target;
  if (isDef(signal)) msg.signal = signal;
  if (isDef(arguments_)) msg.arguments = arguments_;
  if (isDef(payload)) msg.payload = payload;
  if (isDef(mid)) msg.mid = mid;
  if (isDef(tenant)) msg.tenant = tenant;
  if (isDef(source)) msg.source = source;
  if (isDef(sid)) msg.sid = sid;
  if (isDef(ok)) msg.ok = ok;
  if (isDef(subTarget)) msg.subTarget = subTarget;

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

// IMMUTABLE VERSIONS /////////////////

export const fieldsImm = Set(fields);

export function packImm(obj) {
  return JSON.stringify(
    obj.merge(Map(this.baseMessage()))
      .filter((value, key) => fieldsImm.includes(key))
      .toJS()
  );
}

export function unpackImm(textMsg) {
  return Map(JSON.parse(textMsg));
}

// ////////////////////////////////////

export default {
  fields,
  pack,
  packObj,
  unpack,
  unpackVerify,
  fieldsImm,
  packImm,
  unpackImm,
};
