import { KeyCombo } from "./keyCombo";
import { KbNavBehavior, DimensionStore, KbNavBehaviorParams } from "./types";
import { getWidth } from "./utils/dom";

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
