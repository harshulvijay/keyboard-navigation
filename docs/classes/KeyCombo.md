[keyboard-navigation](../README.md) / KeyCombo

# Class: KeyCombo

Class for using key combinations (i.e, of the form `<modifier key> +
<alphanumeric key>`)

## Table of contents

### Constructors

- [constructor](KeyCombo.md#constructor)

### Properties

- [combo](KeyCombo.md#combo)
- [keys](KeyCombo.md#keys)

### Methods

- [generateKeyCombo](KeyCombo.md#generatekeycombo)
- [getKeyCombo](KeyCombo.md#getkeycombo)
- [getKeyFromCombo](KeyCombo.md#getkeyfromcombo)

## Constructors

### constructor

• **new KeyCombo**(...`keys`)

Constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...keys` | `string`[] | keys involved in the key combo |

#### Defined in

[keyCombo.ts:25](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyCombo.ts#L25)

## Properties

### combo

• **combo**: `string`

String of keys separated by a delimiter `d`

Generated from `KeyCombo.keys`

#### Defined in

[keyCombo.ts:13](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyCombo.ts#L13)

___

### keys

• **keys**: `string`[]

Keys involved in the key combo

#### Defined in

[keyCombo.ts:18](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyCombo.ts#L18)

## Methods

### generateKeyCombo

▸ `Static` **generateKeyCombo**(`delim`, ...`keys`): `string`

Generates combo string of `k` separated by `d`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `delim` | `string` | delimiter |
| `...keys` | `string`[] | array of key names |

#### Returns

`string`

key combo

#### Defined in

[keyCombo.ts:38](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyCombo.ts#L38)

___

### getKeyCombo

▸ `Static` **getKeyCombo**(`e`, `delim?`): ``null`` \| `string`

Generates key combo from `e`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `KeyboardEvent` | keyboard event |
| `delim` | `string` | delimiter used in the key combo |

#### Returns

``null`` \| `string`

key combo or `null`, in case the key pressed is a
modifier key

#### Defined in

[keyCombo.ts:71](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyCombo.ts#L71)

___

### getKeyFromCombo

▸ `Static` **getKeyFromCombo**(`keys`): `string`

Gets key/key combo as a string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | `string` \| [`KeyCombo`](KeyCombo.md) | key/key combo |

#### Returns

`string`

#### Defined in

[keyCombo.ts:51](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyCombo.ts#L51)
