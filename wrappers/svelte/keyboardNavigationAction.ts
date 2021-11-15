import { KeyMap } from "../../lib/keyMap";
import { addKbNav } from "../../lib/navigation";

export interface ActionOptions {
  /**
   * @param {KeyMap<T extends HTMLElement>} keymap key map to use
   */
  keymap: KeyMap;

  /**
   * @param {string} selector selector that can select any direct child of `nc`
   */
  selector: string;
}

/**
 * Keyboard navigation Svelte action
 *
 * @param {HTMLElement} node container to add keyboard navigation to
 * @param {ActionOptions} options options
 */
export function keyboardNavigation(node: HTMLElement, options: ActionOptions) {
  addKbNav(options.keymap, node, options.selector);
}

export default keyboardNavigation;
