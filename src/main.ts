import "./style.scss";
import { createBoxGrid } from "./grid";

const app = document.querySelector<HTMLDivElement>("#app")!;

/**
 * Initializes the app
 *
 * @param {T extends HTMLElement = HTMLDivElement} root app's root component
 */
const init = <T extends HTMLElement = HTMLDivElement>(root: T) => {
  const grid = createBoxGrid(100);
  root.appendChild(grid);
};

init<HTMLDivElement>(app);
