[keyboard-navigation](../README.md) / KeyMap

# Class: KeyMap<T\>

Class for generating key maps

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `HTMLElement` |

## Table of contents

### Constructors

- [constructor](KeyMap.md#constructor)

### Properties

- [map](KeyMap.md#map)

### Methods

- [attachBehavior](KeyMap.md#attachbehavior)
- [copy](KeyMap.md#copy)
- [detachBehavior](KeyMap.md#detachbehavior)
- [mirror](KeyMap.md#mirror)

## Constructors

### constructor

• **new KeyMap**<`T`\>(`keymap?`)

Constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `HTMLElement` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keymap?` | [`ShortcutMap`](../README.md#shortcutmap)<`T`\> | map to use initially |

#### Defined in

[keyMap.ts:22](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyMap.ts#L22)

## Properties

### map

• **map**: [`ShortcutMap`](../README.md#shortcutmap)<`T`\> = `{}`

#### Defined in

[keyMap.ts:15](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyMap.ts#L15)

## Methods

### attachBehavior

▸ **attachBehavior**(`keys`, `options`): `void`

Attaches behavior (`p.behavior`) to each key in `k`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | [`Keys`](../README.md#keys) | keys to attach the defined behavior to |
| `options` | [`AddBehaviorOptions`](../interfaces/AddBehaviorOptions.md)<`T`\> | options |

#### Returns

`void`

#### Defined in

[keyMap.ts:46](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyMap.ts#L46)

___

### copy

▸ **copy**(`keymap?`): `void`

Merges `m` into the current key map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keymap?` | [`KeyMap`](KeyMap.md)<`T`\> \| [`ShortcutMap`](../README.md#shortcutmap)<`T`\> | map to copy |

#### Returns

`void`

#### Defined in

[keyMap.ts:80](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyMap.ts#L80)

___

### detachBehavior

▸ **detachBehavior**(`keys`): `void`

Detaches (deletes) behavior for each key/key combo in `k`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | [`Keys`](../README.md#keys) | keys to detach the behaviors for |

#### Returns

`void`

#### Defined in

[keyMap.ts:93](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyMap.ts#L93)

___

### mirror

▸ **mirror**(`keymap?`): `void`

Mirrors map `m`, overriding the current one

It basically sets the current map to a live reference of `m`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keymap?` | [`ShortcutMap`](../README.md#shortcutmap)<`T`\> | map to mirror |

#### Returns

`void`

#### Defined in

[keyMap.ts:107](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/keyMap.ts#L107)
