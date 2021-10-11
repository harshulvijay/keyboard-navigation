import "./style.scss";
import { createBoxGrid } from "./grid";

const app = document.querySelector<HTMLDivElement>("#app")!;

/**
 * Initializes the app
 * 
 * @param {T extends HTMLElement = HTMLDivElement} root app's root component
 */
const init = <T extends HTMLElement = HTMLDivElement>(root: T) => {
  createBoxGrid(root, 100);
};

init<HTMLDivElement>(app);
