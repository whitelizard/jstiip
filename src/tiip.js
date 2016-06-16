
function baseMessage() {
  return {
    protocol: 'tiip.0.9',
    timestamp: String(Date.now() / 1000),
  };
}

function isDef(value) {
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

export default {
  pack,
  packObj,
  unpack,
  unpackVerify,
};
