# jstiip

Javascript implementation of the protocol [TIIP](https://github.com/whitelizard/tiip)

Create a Tiip message by instantiating a Tiip class. Give it a JSON string or a JS object, or add
the fields after creation. The creation of an instance, and any change to the message fields, will
throw on almost any violation of the protocol specification.

### Example 1

```js
import Tiip from 'jstiip';

const msg = new Tiip({ type: 'req', mid: '000', targ: ['db'], sig: 'readUser' });
msg.arg = { users: ['me'] };

ws.send(msg.toJson());
```

- [`Tiip`](#tiip)
- [`fromJson`](#fromjson)
- [`fromJS`](#fromjs)
- [`tsUpdate`](#tsupdate)
- [`latUpdate`](#latUpdate)
- [`toJS`](#tojs)
- [`toJson`](#tojson)

## `Tiip`

The contructor to the class can take a JSON string or a JS object to initiate the message with.

| Argument      | Type              | Default | Description                                             |
| ------------- | ----------------- | ------- | ------------------------------------------------------- |
| `from`        | `string`/`Object` |         | JSON string **OR** JS object.                           |
| `loadingTiip` | `boolean`         | `false` | If not a new message, but a Tiip that should be loaded. |

## `fromJson`

Initiate the message from a JSON string (if you need to do it after you create the message object).

| Argument      | Type      | Default | Description                                             |
| ------------- | --------- | ------- | ------------------------------------------------------- |
| `str`         | `string`  |         | JSON string (Tiip)                                      |
| `loadingTiip` | `boolean` | `false` | If not a new message, but a Tiip that should be loaded. |

## `fromJS`

Initiate the message from a JS object (if you need to do it after you create the message object).

| Argument      | Type      | Default | Description                                             |
| ------------- | --------- | ------- | ------------------------------------------------------- |
| `obj`         | `Object`  |         | JS object (Tiip)                                        |
| `loadingTiip` | `boolean` | `false` | If not a new message, but a Tiip that should be loaded. |

## `tsUpdate`

Set the `ts` (timestamp) field to current time (right now).

## `latUpdate`

Set the `lat` (latency) field to the difference between now and ts.

## `toJS`

Returns the message as a JS object.

## `toJson`

Returns the message as a Json string.

## Getters / Setters

- `pv`: get
- `ts`: get/set (see also `tsUpdate`)
- `lat`: get/set (see also `latUpdate`)
- `type`: get/set
- `mid`: get/set
- `sid`: get/set
- `ten`: get/set
- `targ`: get/set
- `src`: get/set
- `ok`: get/set
- `ch`: get/set
- `sig`: get/set
- `arg`: get/set
- `pl`: get/set

```js
import Tiip from 'jstiip';
const msg = new Tiip();

msg.type = 'pub';
msg.ch = 'temperature';
msg.pl = [21.4];

console.log(msg.pv, msg.ts);
```
