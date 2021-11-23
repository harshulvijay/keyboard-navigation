import { isModifierKey, ModifierKeys } from "./utils/modKeys";

/**
 * Class for using key combinations (i.e, of the form `<modifier key> +
 * <alphanumeric key>`)
 */
export class KeyCombo {
  /**
   * String of keys separated by a delimiter `delim`
   *
   * Generated from `KeyCombo.keys`
   */
  combo: string;

  /**
   * Keys involved in the key combo
   */
  keys: string[];

  /**
   * Constructor
   *
   * @param {string[]} keys keys involved in the key combo
   */
  constructor(...keys: string[]) {
    // convert each key name to lowercase
    this.keys = keys.map((key) => key.toLowerCase());
    this.combo = KeyCombo.generateKeyCombo(`+`, ...this.keys);
  }

  /**
   * Generates combo string of `keys` separated by `delim`
   *
   * @param {string} delim delimiter
   * @param {string[]} keys array of key names
   * @returns {string} key combo
   */
  static generateKeyCombo(delim: string, ...keys: string[]): string {
    return keys
      .filter((key) => key)
      .join(delim)
      .toLowerCase();
  }

  /**
   * Gets key/key combo as a string
   *
   * @param keys key/key combo
   * @returns {string}
   */
  static getKeyFromCombo(keys: string | KeyCombo): string {
    if (keys instanceof KeyCombo) {
      // it is a key combo (`KeyCombo`)
      const { combo } = keys;

      return combo;
    } else {
      // it is a key name as a plain string
      return keys.toLowerCase();
    }
  }

  /**
   * Generates key combo from `e`
   *
   * @param {KeyboardEvent} e keyboard event
   * @param {string} delim delimiter used in the key combo
   * @returns {string | null} key combo or `null`, in case the key pressed is a
   * modifier key
   */
  static getKeyCombo(e: KeyboardEvent, delim: string = `+`): string | null {
    if (isModifierKey(e.key)) return null;

    // alt
    const a = e.altKey ? ModifierKeys.ALT : "";
    // control
    const c = e.ctrlKey ? ModifierKeys.CTRL : "";
    // meta
    const m = e.metaKey ? ModifierKeys.META : "";
    // shift
    const s = e.shiftKey ? ModifierKeys.SHIFT : "";

    return this.generateKeyCombo(delim, a, c, m, s, e.key.toLowerCase());
  }
}
