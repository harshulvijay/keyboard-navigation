import { FocusableElement } from "./focusable";

/**
 * Focuses on the `[data-<f>=<i>]` element in the children of `nc`
 *
 * @param {HTMLElement} navigationContainer navigation container
 * @param {string} field field of the dataset to match against
 * @param {number} index index of the element to focus on
 */
export const focusOn = (
  navigationContainer: HTMLElement,
  field: string,
  index: number
) => {
  const element = navigationContainer.querySelector(
    `[data-${field}="${index}"]`
  ) as FocusableElement;

  element?.focus();
};
