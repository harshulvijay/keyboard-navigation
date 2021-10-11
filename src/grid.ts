import { createBox } from "./box";

/**
 * Creates a grid element with `n` boxes
 *
 * @param {number} n number of boxes in the grid
 */
export const createBoxGrid = (n: number) => {
  const grid = document.createElement("div");
  grid.classList.add("grid");

  for (let i = 1; i <= n; i++) {
    const box = createBox(i.toString());
    box.tabIndex = i;
    grid.append(box);
  }

  return grid;
};
