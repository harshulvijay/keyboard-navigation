import { KeyCombo } from "./keyCombo";
import { KeyMap } from "./keyMap";
import { DimensionStore, KbNavBehaviorParams } from "./types";
import { getWidth } from "./utils/dom";

/**
 * Adds keyboard navigation to `navigationContainer`
 *
 * @param {KeyMap<T extends HTMLElement>} keymap key map to use
 * @param {T extends HTMLElement} navigationContainer navigation container
 * @param {string} selector selector that can select any direct child of `nc`
 */
export const addKbNav = <T extends HTMLElement>(
  keymap: KeyMap<T>,
  navigationContainer: T,
  selector: string
) => {
  const generalElement = document.querySelector(selector) as T | undefined;

  // keyboard navigation can only be added if `nc` has children
  if (generalElement) {
    const dimensions: DimensionStore = {
      children: {
        width: getWidth(generalElement),
      },
      container: {
        width: getWidth(navigationContainer),
      },
    };

    const updateDimensions = () => {
      dimensions.children = {
        width: getWidth(generalElement),
      };
      dimensions.container = {
        width: getWidth(navigationContainer),
      };
    };

    // options for `ResizeObserver`s
    const resizeObserverOptions: ResizeObserverOptions = {
      box: "device-pixel-content-box",
    };

    // reset dimensions if document's body/element resizes
    // we are observing the document's body instead of using `window.onresize`
    // since it will change if the window resizes
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(document.body, resizeObserverOptions);
    resizeObserver.observe(navigationContainer, resizeObserverOptions);

    navigationContainer.onkeydown = (e) => {
      const key = KeyCombo.getKeyCombo(e);

      if (key) {
        // it is a valid key (combo)!
        // prepare for execution of the defined behavior

        const { target } = e;
        const targetEl: T | null = target as T | null;

        const behaviorMeta = keymap.map[key.toLowerCase()];

        // proceed further if the target element and behavior data for the
        // key exist
        if (targetEl && behaviorMeta) {
          const { behavior, preventsDefault } = behaviorMeta;

          const params: KbNavBehaviorParams<T> = {
            elements: Math.floor(
              dimensions.container.width / dimensions.children.width
            ),
            event: e,
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
            (preventsDefault === undefined || preventsDefault) &&
              e.preventDefault();
          }
        }
      }
    };
  }
};
