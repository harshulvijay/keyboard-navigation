[keyboard-navigation](../README.md) / KbNavBehaviorItem

# Interface: KbNavBehaviorItem<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `HTMLElement` |

## Hierarchy

- **`KbNavBehaviorItem`**

  ↳ [`AddBehaviorOptions`](AddBehaviorOptions.md)

## Table of contents

### Properties

- [preventsDefault](KbNavBehaviorItem.md#preventsdefault)
- [stack](KbNavBehaviorItem.md#stack)

### Methods

- [behavior](KbNavBehaviorItem.md#behavior)

## Properties

### preventsDefault

• `Optional` **preventsDefault**: `boolean`

Determines whether this key/key combo prevents the default browser
behavior or not

If not set, default browser behavior will be prevented.

#### Defined in

[types.ts:28](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/types.ts#L28)

___

### stack

• **stack**: `boolean`

#### Defined in

[types.ts:29](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/types.ts#L29)

## Methods

### behavior

▸ **behavior**(`o`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | [`KbNavBehaviorParams`](KbNavBehaviorParams.md)<`T`\> |

#### Returns

`void`

#### Defined in

[types.ts:21](https://github.com/harshulvijay/keyboard-navigation/blob/9fb72fc/lib/types.ts#L21)
