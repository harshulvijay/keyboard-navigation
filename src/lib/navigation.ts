import { KeyCombo } from "./keyCombo";
import { KeyMap } from "./keyMap";
import { DimensionStore, KbNavBehaviorParams } from "./types";
import { getWidth } from "./utils/dom";

/**
 * Adds keyboard navigation to `nc`
 *
 * @param {KeyMap<T extends HTMLElement>} m key map to use
 * @param {T extends HTMLElement} nc navigation container
 * @param {string} s selector that can select any direct child of `nc`
 */
export const addKbNav = <T extends HTMLElement>(
  m: KeyMap<T>,
  nc: T,
  s: string
) => {
  const generalElement = document.querySelector(s) as T | undefined;

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
        const targetEl: T | null = target as T | null;

        const behaviorMeta = m.map[key.toLowerCase()];

        // proceed further if the target element and behavior data for the
        // key exist
        if (targetEl && behaviorMeta) {
          const { behavior, preventsDefault: pd } = behaviorMeta;

          const params: KbNavBehaviorParams<T> = {
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
            // prevent the event from bubbling
            e.cancelBubble = true;
            // stop the default behavior of the key if `preventsDefault` is
            // set to `true`, or is `undefined`
            (pd === undefined || pd) && e.preventDefault();
          }
        }
      }
    };
  }
};
