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
 * Navigation behavior map
 *
 * @type {Record<string, KbNavBehavior>}
 */
const navBehaviorMap: Record<string, KbNavBehavior> = {};

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
 * Focuses on the `[data-number=<i>]` element in the children of `nc`
 *
 * @param {HTMLElement} nc navigation container
 * @param {number} i index of the element to focus on
 */
export const focusOn = (nc: HTMLElement, i: number) => {
  const element = nc.querySelector(`[data-number="${i}"]`) as FocusableElement;

  element?.focus();
};

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
 * @todo add support for key combinations
 *
 * @param {string[]} k key(s) to bind the behavior to
 * @param {KbNavBehavior} f behavior
 * @param {boolean} s whether to "stack" behaviors on top of each other
 */
export const addKbNavBehavior = (k: string[], f: KbNavBehavior, s: boolean) => {
  k.map((item) => {
    const key = item.toLowerCase();

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
        throw new Error(`behavior for key "${key}" has already been defined`);
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
      // skip modifier keys
      if (!modifierKeyPressed(e)) {
        // stop the default behavior of the key
        e.preventDefault();

        const { key, target } = e;
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
        behavior?.bind(undefined, params).call(undefined);
      }
    };
  }
};
