import { KeyCombo } from "./keyCombo";

/**
 * Options used when adding a new behavior
 */
export interface AddBehaviorOptions<T> extends KbNavBehaviorItem<T> {}

/**
 * Object for storing dimensions of different entities
 */
export interface DimensionStore {
  children: {
    width: number;
  };
  container: {
    width: number;
  };
}

export interface KbNavBehaviorItem<T = HTMLElement> {
  behavior: (o: KbNavBehaviorParams<T>) => void;
  /**
   * Determines whether this key/key combo prevents the default browser
   * behavior or not
   *
   * If not set, default browser behavior will be prevented.
   */
  preventsDefault?: boolean;
  stack: boolean;
}

/**
 * Parameters passed to the function(s) of signature `KBNavBehavior`
 */
export interface KbNavBehaviorParams<T = HTMLElement> {
  /**
   * Number of elements in a single "row" (as seen on a browser)
   */
  elements: number;

  /**
   * Keyboard event
   */
  event: KeyboardEvent;

  target: {
    dataset: DOMStringMap;
    element: T;
    position: number;
  };
}

export type KbNavBehavior<T = HTMLElement> = (o: KbNavBehaviorParams<T>) => void;

export type Keys = (string | KeyCombo)[];

export type ShortcutMap<T> = Record<string, KbNavBehaviorItem<T>>;
