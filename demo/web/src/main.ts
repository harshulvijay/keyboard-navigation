import "./style.scss";
import { createBoxGrid } from "./grid";
import { addKbNav, KeyCombo } from "@lib/index";
import { focusOn } from "@lib/utils/dom";
import { KeyMap } from "@lib/keyMap";

const app = document.querySelector<HTMLDivElement>("#app")!;

/**
 * Initializes the app
 *
 * @param {T extends HTMLElement = HTMLDivElement} root app's root component
 */
const init = <T extends HTMLElement = HTMLDivElement>(root: T) => {
  const grid = createBoxGrid(100);
  root.appendChild(grid);

  const keymap1 = new KeyMap();
  const keymap2 = new KeyMap();

  keymap1.attachBehavior(["arrowup", "w"], {
    behavior: (o) => {
      const next = o.target.position - o.elements;
      focusOn(grid, "number", next);
    },
    stack: false,
  });
  keymap1.attachBehavior(["arrowdown", "s"], {
    behavior: (o) => {
      const next = o.target.position + o.elements;
      focusOn(grid, "number", next);
    },
    stack: false,
  });
  keymap1.attachBehavior(["arrowleft", "a"], {
    behavior: (o) => {
      const next = o.target.position - 1;
      focusOn(grid, "number", next);
    },
    stack: false,
  });
  keymap1.attachBehavior(["arrowright", "d"], {
    behavior: (o) => {
      const next = o.target.position + 1;
      focusOn(grid, "number", next);
    },
    stack: false,
  });
  keymap1.attachBehavior(["home"], {
    behavior: () => focusOn(grid, "number", 1),
    stack: false,
  });
  keymap1.attachBehavior([new KeyCombo("shift", "home")], {
    behavior: (o) => {
      let row = o.target.position / o.elements;
      if (row % 1 === 0) {
        row -= 1;
      }

      const pos = Math.floor(row) * o.elements + 1;
      focusOn(grid, "number", pos);
    },
    stack: false,
  });
  keymap1.attachBehavior(["end"], {
    behavior: () => focusOn(grid, "number", grid.children.length),
    stack: false,
  });
  keymap1.attachBehavior([new KeyCombo("shift", "end")], {
    behavior: (o) => {
      let row = o.target.position / o.elements;
      if (row % 1 === 0) {
        row -= 1;
      }

      const pos = (Math.floor(row) + 1) * o.elements;
      focusOn(grid, "number", pos);
    },
    stack: false,
  });
  keymap1.attachBehavior(["`"], {
    behavior: () => {
      const pos = parseInt(prompt("position of the block") || "");
      pos && focusOn(grid, "number", pos);
    },
    stack: false,
  });
  keymap1.attachBehavior([new KeyCombo("control", "s")], {
    behavior: () => {
      console.log("ctrl+s pressed; not preventing default behavior");
    },
    stack: false,
    preventsDefault: false,
  });

  keymap2.copy(keymap1);
  keymap2.detachBehavior(["`"]);

  console.log("grid");
  addKbNav(keymap1, grid, ".box");
  console.log("body");
  addKbNav(keymap2, document.body, ".box");
};

init<HTMLDivElement>(app);
