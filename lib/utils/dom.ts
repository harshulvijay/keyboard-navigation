/**
 * DOM utils
 */

import { FocusableElement } from "../focusable";

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
