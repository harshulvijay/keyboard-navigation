import { isModifierKey, ModifierKeys } from "./utils/modKeys";

/**
 * Class for using key combinations (i.e, of the form `<modifier key> +
 * <alphanumeric key>`)
 */
export class KeyCombo {
  /**
   * String of keys separated by a delimiter `d`
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
   * @param {string[]} k keys involved in the key combo
   */
  constructor(...k: string[]) {
    // convert each key name to lowercase
    this.keys = k.map((v) => v.toLowerCase());
    this.combo = KeyCombo.generateKeyCombo(`+`, ...this.keys);
  }

  /**
   * Generates combo string of `k` separated by `d`
   *
   * @param {string} d delimiter
   * @param {string[]} k array of key names
   * @returns {string} key combo
   */
  static generateKeyCombo(d: string, ...k: string[]): string {
    return k
      .filter((key) => key)
      .join(d)
      .toLowerCase();
  }

  /**
   * Generates key combo from `e`
   *
   * @param {KeyboardEvent} e keyboard event
   * @param {string} d delimiter used in the key combo
   * @returns {string | null} key combo or `null`, in case the key pressed is a
   * modifier key
   */
  static getKeyCombo(e: KeyboardEvent, d: string = `+`): string | null {
    if (isModifierKey(e.key)) return null;

    // alt
    const a = e.altKey ? ModifierKeys.ALT : "";
    // control
    const c = e.ctrlKey ? ModifierKeys.CTRL : "";
    // meta
    const m = e.metaKey ? ModifierKeys.META : "";
    // shift
    const s = e.shiftKey ? ModifierKeys.SHIFT : "";

    return this.generateKeyCombo(d, a, c, m, s, e.key.toLowerCase());
  }
}
