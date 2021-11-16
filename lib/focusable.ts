/**
 * A HTML element/derivative that can be focused
 */
export interface FocusableElement extends HTMLElement {
  focus(options?: FocusOptions): void;
}
