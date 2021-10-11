import { createBox } from "./box";

/**
 * Creates a grid element with `n` boxes and appends it to `p`
 *
 * @param {HTMLElement} p parent element of the grid
 * @param {number} n number of boxes in the grid
 */
export const createBoxGrid = (p: HTMLElement, n: number) => {
  const grid = document.createElement("div");
  grid.classList.add("grid");

  for (let i = 0; i < n; i++) {
    const box = createBox(i.toString());
    grid.append(box);
  }

  p.append(grid);
};
