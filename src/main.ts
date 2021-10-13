import "./style.scss";
import { createBoxGrid } from "./grid";
import { addKbNav, addKbNavBehavior, KeyCombo } from "./lib";
import { focusOn } from "./lib/utils/dom";

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
      focusOn(grid, "number", next);
    },
    false
  );
  addKbNavBehavior(
    ["arrowdown", "s"],
    (o) => {
      const next = o.target.position + o.elements;
      focusOn(grid, "number", next);
    },
    false
  );
  addKbNavBehavior(
    ["arrowleft", "a"],
    (o) => {
      const next = o.target.position - 1;
      focusOn(grid, "number", next);
    },
    false
  );
  addKbNavBehavior(
    ["arrowright", "d"],
    (o) => {
      const next = o.target.position + 1;
      focusOn(grid, "number", next);
    },
    false
  );
  addKbNavBehavior(["home"], () => focusOn(grid, "number", 1), false);
  addKbNavBehavior(
    [new KeyCombo("shift", "home")],
    (o) => {
      let row = o.target.position / o.elements;
      if (row % 1 === 0) {
        row -= 1;
      }

      const pos = Math.floor(row) * o.elements + 1;
      focusOn(grid, "number", pos);
    },
    false
  );
  addKbNavBehavior(
    ["end"],
    () => focusOn(grid, "number", grid.children.length),
    false
  );
  addKbNavBehavior(
    [new KeyCombo("shift", "end")],
    (o) => {
      let row = o.target.position / o.elements;
      if (row % 1 === 0) {
        row -= 1;
      }

      const pos = (Math.floor(row) + 1) * o.elements;
      focusOn(grid, "number", pos);
    },
    false
  );
  addKbNav(grid, ".box");
};

init<HTMLDivElement>(app);
