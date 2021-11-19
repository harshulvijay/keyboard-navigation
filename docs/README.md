keyboard-navigation

# keyboard-navigation

## Table of contents

### Classes

- [KeyCombo](classes/KeyCombo.md)
- [KeyMap](classes/KeyMap.md)

### Interfaces

- [AddBehaviorOptions](interfaces/AddBehaviorOptions.md)
- [DimensionStore](interfaces/DimensionStore.md)
- [KbNavBehaviorItem](interfaces/KbNavBehaviorItem.md)
- [KbNavBehaviorParams](interfaces/KbNavBehaviorParams.md)

### Type aliases

- [KbNavBehavior](README.md#kbnavbehavior)
- [Keys](README.md#keys)
- [ShortcutMap](README.md#shortcutmap)

### Functions

- [addKbNav](README.md#addkbnav)

## Type aliases

### KbNavBehavior

Ƭ **KbNavBehavior**<`T`\>: (`o`: [`KbNavBehaviorParams`](interfaces/KbNavBehaviorParams.md)<`T`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `HTMLElement` |

#### Type declaration

▸ (`o`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `o` | [`KbNavBehaviorParams`](interfaces/KbNavBehaviorParams.md)<`T`\> |

##### Returns

`void`

#### Defined in

[types.ts:53](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/types.ts#L53)

___

### Keys

Ƭ **Keys**: (`string` \| [`KeyCombo`](classes/KeyCombo.md))[]

#### Defined in

[types.ts:55](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/types.ts#L55)

___

### ShortcutMap

Ƭ **ShortcutMap**<`T`\>: `Record`<`string`, [`KbNavBehaviorItem`](interfaces/KbNavBehaviorItem.md)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:57](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/types.ts#L57)

## Functions

### addKbNav

▸ `Const` **addKbNav**<`T`\>(`keymap`, `navigationContainer`, `selector`): `void`

Adds keyboard navigation to `nc`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keymap` | [`KeyMap`](classes/KeyMap.md)<`T`\> | key map to use |
| `navigationContainer` | `T` | navigation container |
| `selector` | `string` | selector that can select any direct child of `nc` |

#### Returns

`void`

#### Defined in

[navigation.ts:13](https://github.com/harshulvijay/keyboard-navigation/blob/b9c7092/lib/navigation.ts#L13)
