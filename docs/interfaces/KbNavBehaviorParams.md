[keyboard-navigation](../README.md) / KbNavBehaviorParams

# Interface: KbNavBehaviorParams<T\>

Parameters passed to the function(s) of signature `KBNavBehavior`

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `HTMLElement` |

## Table of contents

### Properties

- [elements](KbNavBehaviorParams.md#elements)
- [event](KbNavBehaviorParams.md#event)
- [target](KbNavBehaviorParams.md#target)

## Properties

### elements

• **elements**: `number`

Number of elements in a single "row" (as seen on a browser)

#### Defined in

[types.ts:39](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/types.ts#L39)

___

### event

• **event**: `KeyboardEvent`

Keyboard event

#### Defined in

[types.ts:44](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/types.ts#L44)

___

### target

• **target**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dataset` | `DOMStringMap` |
| `element` | `T` |
| `position` | `number` |

#### Defined in

[types.ts:46](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/types.ts#L46)
