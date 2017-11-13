# jstiip
Javascript implementation of the protocol [TIIP](https://github.com/whitelizard/tiip)

Create a Tiip message by instantiating a Tiip class. Give it a JSON string or a JS object, or add the fields after creation. The creation of an instance, and any change to the message fields, will throw on almost any violation of the protocol specification.

### Example 1

```js
import Tiip from 'jstiip';

const msg = new Tiip({ type: 'req', mid: '000', targ: ['db'], sig: 'readUser' });
msg.arg = { users: ['me'] };

ws.send(msg.toJson());
```

- [`Tiip`](#tiip)
- [`fromJson`](#fromjson)
- [`tsUpdate`](#tsupdate)
- [`ctUpdate`](#ctupdate)
- [`set`](#set)
- [`toJS`](#tojs)
- [`toJson`](#tojson)


### `Tiip`

The contructor to the class can take a JSON string or a JS object to initiate the message with.

| Argument | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `from` | `string`/`Object` | | JSON string **OR** JS object. |

### ´
