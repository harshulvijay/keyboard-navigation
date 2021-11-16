/**
 * DOM utils
 */

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
