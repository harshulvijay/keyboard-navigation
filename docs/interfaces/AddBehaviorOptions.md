[keyboard-navigation](../README.md) / AddBehaviorOptions

# Interface: AddBehaviorOptions<T\>

Options used when adding a new behavior

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`KbNavBehaviorItem`](KbNavBehaviorItem.md)<`T`\>

  ↳ **`AddBehaviorOptions`**

## Table of contents

### Properties

- [preventsDefault](AddBehaviorOptions.md#preventsdefault)
- [stack](AddBehaviorOptions.md#stack)

### Methods

- [behavior](AddBehaviorOptions.md#behavior)

## Properties

### preventsDefault

• `Optional` **preventsDefault**: `boolean`

Determines whether this key/key combo prevents the default browser
behavior or not

If not set, default browser behavior will be prevented.

#### Inherited from

[KbNavBehaviorItem](KbNavBehaviorItem.md).[preventsDefault](KbNavBehaviorItem.md#preventsdefault)

#### Defined in

[types.ts:28](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/types.ts#L28)

___

### stack

• **stack**: `boolean`

#### Inherited from

[KbNavBehaviorItem](KbNavBehaviorItem.md).[stack](KbNavBehaviorItem.md#stack)

#### Defined in

[types.ts:29](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/types.ts#L29)

## Methods

### behavior

▸ **behavior**(`o`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | [`KbNavBehaviorParams`](KbNavBehaviorParams.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[KbNavBehaviorItem](KbNavBehaviorItem.md).[behavior](KbNavBehaviorItem.md#behavior)

#### Defined in

[types.ts:21](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/types.ts#L21)
