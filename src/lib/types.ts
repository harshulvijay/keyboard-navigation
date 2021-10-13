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

/**
 * Parameters passed to the function(s) of signature `KBNavBehavior`
 */
export interface KbNavBehaviorParams<T = HTMLElement> {
  /**
   * Number of elements in a single "row" (as seen on a browser)
   */
  elements: number;
  target: {
    dataset: DOMStringMap;
    element: T;
    position: number;
  };
}

export type KbNavBehavior<T = HTMLElement> = (o: KbNavBehaviorParams<T>) => void;
