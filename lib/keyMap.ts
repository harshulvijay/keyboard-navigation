import { KeyCombo } from "./keyCombo";
import {
  AddBehaviorOptions,
  KbNavBehaviorItem,
  Keys,
  ShortcutMap,
} from "./types";

/**
 * Class for generating key maps
 *
 * @typedef {(string | KeyCombo)[]} Keys
 */
export class KeyMap<T = HTMLElement> {
  map: ShortcutMap<T> = {};

  /**
   * Constructor
   *
   * @param {ShortcutMap<T>} m map to use initially
   */
  constructor(m?: ShortcutMap<T>) {
    this.map = m ?? {};
  }

  /**
   * Converts objects of type `AddBehaviorOptions` to type `KbNavBehaviorItem`
   *
   * @param {AddBehaviorOptions<T>} p object to use to extract properties
   * @returns {KbNavBehaviorItem<T>}
   */
  private extractKNBItem(p: AddBehaviorOptions<T>): KbNavBehaviorItem<T> {
    const c: AddBehaviorOptions<T> = { ...p };
    // remove the extra properties from `p` to make it fit the type
    // `KbNavBehaviorItem`
    // there are none... as of now
    return c;
  }

  /**
   * Attaches behavior (`p.behavior`) to each key in `k`
   *
   * @param {Keys} k keys to attach the defined behavior to
   * @param {AddBehaviorOptions<T>} p options
   */
  attachBehavior(k: Keys, p: AddBehaviorOptions<T>) {
    k.map((item) => {
      const key: string = KeyCombo.getKeyFromCombo(item);

      if (this.map[key]) {
        // behavior for `key` already exists

        if (p.stack) {
          // we've been told to stack the behaviors, so stack them in the order in
          // which they were defined

          const { behavior: prevBehavior } = this.map[key];

          this.map[key] = this.extractKNBItem(p);
          this.map[key].behavior = (o) => {
            prevBehavior(o);
            p.behavior(o);
          };
        } else {
          throw new Error(
            `behavior for key/combo "${key}" has already been defined`
          );
        }
      } else {
        this.map[key] = this.extractKNBItem(p);
      }
    });
  }

  /**
   * Merges `m` into the current key map
   *
   * @param {ShortcutMap<T>} m map to copy
   */
  copy(m?: KeyMap<T> | ShortcutMap<T>) {
    // if we're given an object belonging to class `KeyMap`,
    // extract the map from the class
    let s: ShortcutMap<T> | undefined = m instanceof KeyMap ? m.map : m;
    s && (this.map = { ...this.map, ...s });
  }

  /**
   * Detaches (deletes) behavior for each key/key combo in `k`
   *
   * @param {Keys} k keys to detach the behaviors for
   */
  detachBehavior(k: Keys) {
    k.map((item) => {
      const key: string = KeyCombo.getKeyFromCombo(item);
      delete this.map[key];
    });
  }

  /**
   * Mirrors map `m`, overriding the current one
   *
   * It basically sets the current map to a live reference of `m`
   *
   * @param {ShortcutMap<T>} m map to mirror
   */
  mirror(m?: ShortcutMap<T>) {
    m && (this.map = m);
  }
}
