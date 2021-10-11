import "./style.scss";
import { createBoxGrid } from "./grid";
import { addKbNav, addKbNavBehavior, focusOn } from "./navigation";

const app = document.querySelector<HTMLDivElement>("#app")!;

/**
 * Initializes the app
 *
 * @param {T extends HTMLElement = HTMLDivElement} root app's root component
 */
const init = <T extends HTMLElement = HTMLDivElement>(root: T) => {
  const grid = createBoxGrid(100);
  root.appendChild(grid);

  addKbNavBehavior(
    ["arrowup", "w"],
    (o) => {
      const next = o.target.position - o.elements;
      focusOn(grid, next);
    },
    false
  );
  addKbNavBehavior(
    ["arrowdown", "s"],
    (o) => {
      const next = o.target.position + o.elements;
      focusOn(grid, next);
    },
    false
  );
  addKbNavBehavior(
    ["arrowleft", "a"],
    (o) => {
      const next = o.target.position - 1;
      focusOn(grid, next);
    },
    false
  );
  addKbNavBehavior(
    ["arrowright", "d"],
    (o) => {
      const next = o.target.position + 1;
      focusOn(grid, next);
    },
    false
  );
  addKbNavBehavior(["home"], () => focusOn(grid, 1), false);
  addKbNavBehavior(["end"], () => focusOn(grid, grid.children.length), false);
  addKbNav(grid, ".box");
};

init<HTMLDivElement>(app);
