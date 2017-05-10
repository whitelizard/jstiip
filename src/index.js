export const fields = ['mid', 'sid', 'type', 'ok', 'ten', 'src', 'targ', 'arg', 'ch', 'sig', 'pl'];

function baseMessage() {
  return {
    pv: 'tiip.2.0',
    ts: String(Date.now() / 1000),
  };
}

function isDef(value) {
  return typeof value !== 'undefined' && value !== null;
}

export function pack(type, targ, sig, arg, pl, mid, ten, src, ch, sid, ok) {
  const msg = baseMessage();

  if (isDef(type)) msg.type = type;
  if (isDef(targ)) msg.targ = targ;
  if (isDef(sig)) msg.sig = sig;
  if (isDef(arg)) msg.arg = arg;
  if (isDef(pl)) msg.pl = pl;
  if (isDef(mid)) msg.mid = mid;
  if (isDef(ten)) msg.ten = ten;
  if (isDef(src)) msg.src = src;
  if (isDef(ch)) msg.ch = ch;
  if (isDef(sid)) msg.sid = sid;
  if (isDef(ok)) msg.ok = ok;

  return JSON.stringify(msg);
}

export function packObj(obj) {
  const msg = { ...baseMessage(), ...obj };
  return JSON.stringify(msg);
}

export function unpack(textMsg) {
  return JSON.parse(textMsg);
}

export function unpackVerify(textMsg) {
  // TODO: Perform validation etc here
  return unpack(textMsg);
}
