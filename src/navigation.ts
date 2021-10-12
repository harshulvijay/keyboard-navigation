import { FocusableElement } from "./focusable";

/**
 * Object for storing dimensions of different entities
 */
interface DimensionStore {
  children: {
    width: number;
  };
  container: {
    width: number;
  };
}

/**
 * Parameters passed to the function(s) of signature `KBNavBehavior`
 */
interface KbNavBehaviorParams<T = HTMLElement> {
  /**
   * Number of elements in a single "row" (as seen on a browser)
   */
  elements: number;
  target: {
    dataset: DOMStringMap;
    element: T;
    position: number;
  };
}

type KbNavBehavior<T = HTMLElement> = (o: KbNavBehaviorParams<T>) => void;

/**
 * Enum of [modifier keys](https://en.wikipedia.org/wiki/Modifier_key)
 */
enum ModifierKeys {
  ALT = "alt",
  CTRL = "control",
  META = "meta",
  SHIFT = "shift",
}

/**
 * Navigation behavior map
 *
 * @type {Record<string, KbNavBehavior>}
 */
const navBehaviorMap: Record<string, KbNavBehavior> = {};

/**
 * Array of modifier keys
 *
 * Generated from the `ModifierKeys` enum
 * (see https://stackoverflow.com/a/57266281)
 */
const modKeys: string[] = Object.values(ModifierKeys);

/**
 * Returns the width of `el`
 *
 * @param {HTMLElement} el element to get the width of
 * @returns {number} total width of `el`
 */
export const getWidth = (el: HTMLElement): number => {
  const style = getComputedStyle(el);

  const width = el.offsetWidth;
  const margin = parseInt(style.marginLeft) + parseInt(style.marginRight);
  const totalWidth = width + margin;

  return totalWidth;
};

/**
 * Focuses on the `[data-<f>=<i>]` element in the children of `nc`
 *
 * @param {HTMLElement} nc navigation container
 * @param {string} f field of the dataset to match against
 * @param {number} i index of the element to focus on
 */
export const focusOn = (nc: HTMLElement, f: string, i: number) => {
  const element = nc.querySelector(`[data-${f}="${i}"]`) as FocusableElement;

  element?.focus();
};

/**
 * Checks if `k` is a modifier key
 *
 * @param {string} k name of the key
 * @returns {boolean}
 */
export const isModifierKey = (k: string): boolean => {
  return modKeys.findIndex((mk) => k.toLowerCase() === mk) !== -1;
};

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

/**
 * Checks if the key pressed is a modifier key
 *
 * @param {KeyboardEvent} e keyboard event
 * @returns {boolean}
 */
export const modifierKeyPressed = (e: KeyboardEvent): boolean => {
  return e.altKey && e.ctrlKey && e.metaKey && e.shiftKey;
};

/**
 * Adds behavior `f` for key(s) `k`, and "stacks" behaviors if `s` is set to
 * `true`
 *
 * @param {(string | KeyCombo)[]} k key(s) to bind the behavior to
 * @param {KbNavBehavior} f behavior
 * @param {boolean} s whether to "stack" behaviors on top of each other
 */
export const addKbNavBehavior = (
  k: (string | KeyCombo)[],
  f: KbNavBehavior,
  s: boolean
) => {
  k.map((item) => {
    let key: string = "";

    if (item instanceof KeyCombo) {
      // it is a key combo (`KeyCombo`)
      ({ combo: key } = item);
    } else {
      // it is a key name as a plain string
      key = item.toLowerCase();
    }

    if (navBehaviorMap[key]) {
      // behavior for `key` already exists

      if (s) {
        // we've been told to stack the behaviors, so stack them in the order in
        // which they were defined

        const prevBehavior = navBehaviorMap[key];

        navBehaviorMap[key] = (o) => {
          prevBehavior(o);
          f(o);
        };
      } else {
        throw new Error(
          `behavior for key/combo "${key}" has already been defined`
        );
      }
    } else {
      navBehaviorMap[key] = f;
    }
  });
};

/**
 * Adds keyboard navigation to `nc`
 *
 * @param {HTMLElement} nc navigation container
 * @param {string} s selector that can select any direct child of `nc`
 */
export const addKbNav = (nc: HTMLElement, s: string) => {
  const generalElement = document.querySelector(s) as HTMLElement | undefined;

  // keyboard navigation can only be added if `nc` has children
  if (generalElement) {
    const dimensions: DimensionStore = {
      children: {
        width: getWidth(generalElement),
      },
      container: {
        width: getWidth(nc),
      },
    };

    // reset dimensions if window is resized
    window.onresize = () => {
      dimensions.children = {
        width: getWidth(generalElement),
      };
      dimensions.container = {
        width: getWidth(nc),
      };
    };

    nc.onkeydown = (e) => {
      const key = KeyCombo.getKeyCombo(e);

      if (key) {
        // it is a valid key (combo)!
        // prepare for execution of the defined behavior

        const { target } = e;
        const targetEl = target as HTMLElement;

        const behavior = navBehaviorMap[key.toLowerCase()];
        const params: KbNavBehaviorParams = {
          elements: Math.floor(
            dimensions.container.width / dimensions.children.width
          ),
          target: {
            dataset: targetEl.dataset,
            element: targetEl,
            position: parseInt(targetEl.dataset.number || "-1", 10),
          },
        };

        // execute the behavior
        if (behavior) {
          behavior.bind(undefined, params).call(undefined);
          // stop the default behavior of the key
          e.preventDefault();
        }
      }
    };
  }
};
