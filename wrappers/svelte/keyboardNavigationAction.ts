import { KeyMap } from "../../lib/keyMap";
import { addKbNav } from "../../lib/navigation";

export function keyboardNavigation(
  node: HTMLElement,
  options: {
    keymap: KeyMap;
    selector: string;
  }
) {
  addKbNav(options.keymap, node, options.selector);
}

export default keyboardNavigation;
