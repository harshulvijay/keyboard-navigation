/**
 * Creates a box with text `t`
 *
 * @param {number} t text to display inside the box and use for its id
 * @returns {HTMLDivElement} box element
 */
export const createBox = (t: string): HTMLDivElement => {
  const box = document.createElement("div");
  box.classList.add("box");
  box.id = `box box--${t}`;
  box.innerText = t;

  return box;
};
