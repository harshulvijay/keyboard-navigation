/**
 * Enum of [modifier keys](https://en.wikipedia.org/wiki/Modifier_key)
 */
export enum ModifierKeys {
  ALT = "alt",
  CTRL = "control",
  META = "meta",
  SHIFT = "shift",
}

/**
 * Array of modifier keys
 *
 * Generated from the `ModifierKeys` enum
 * (see https://stackoverflow.com/a/57266281)
 */
export const modKeys: string[] = Object.values(ModifierKeys);

/**
 * Checks if `k` is a modifier key
 *
 * @param {string} k name of the key
 * @returns {boolean}
 */
export const isModifierKey = (k: string): boolean => {
  return modKeys.findIndex((mk) => k.toLowerCase() === mk) !== -1;
};
