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
   * @param {ShortcutMap<T>} keymap map to use initially
   */
  constructor(keymap?: ShortcutMap<T>) {
    this.map = keymap ?? {};
  }

  /**
   * Converts objects of type `AddBehaviorOptions` to type `KbNavBehaviorItem`
   *
   * @param {AddBehaviorOptions<T>} options object to use to extract properties
   * @returns {KbNavBehaviorItem<T>}
   */
  private extractKNBItem(options: AddBehaviorOptions<T>): KbNavBehaviorItem<T> {
    const c: AddBehaviorOptions<T> = { ...options };
    // remove the extra properties from `p` to make it fit the type
    // `KbNavBehaviorItem`
    // there are none... as of now
    return c;
  }

  /**
   * Attaches behavior (`p.behavior`) to each key in `k`
   *
   * @param {Keys} keys keys to attach the defined behavior to
   * @param {AddBehaviorOptions<T>} options options
   */
  attachBehavior(keys: Keys, options: AddBehaviorOptions<T>) {
    keys.map((item) => {
      const key: string = KeyCombo.getKeyFromCombo(item);

      if (this.map[key]) {
        // behavior for `key` already exists

        if (options.stack) {
          // we've been told to stack the behaviors, so stack them in the order in
          // which they were defined

          const { behavior: prevBehavior } = this.map[key];

          this.map[key] = this.extractKNBItem(options);
          this.map[key].behavior = (o) => {
            prevBehavior(o);
            options.behavior(o);
          };
        } else {
          throw new Error(
            `behavior for key/combo "${key}" has already been defined`
          );
        }
      } else {
        this.map[key] = this.extractKNBItem(options);
      }
    });
  }

  /**
   * Merges `m` into the current key map
   *
   * @param {ShortcutMap<T>} keymap map to copy
   */
  copy(keymap?: KeyMap<T> | ShortcutMap<T>) {
    // if we're given an object belonging to class `KeyMap`,
    // extract the map from the class
    let shortcutMap: ShortcutMap<T> | undefined =
      keymap instanceof KeyMap ? keymap.map : keymap;
    shortcutMap && (this.map = { ...this.map, ...shortcutMap });
  }

  /**
   * Detaches (deletes) behavior for each key/key combo in `k`
   *
   * @param {Keys} keys keys to detach the behaviors for
   */
  detachBehavior(keys: Keys) {
    keys.map((item) => {
      const key: string = KeyCombo.getKeyFromCombo(item);
      delete this.map[key];
    });
  }

  /**
   * Mirrors map `m`, overriding the current one
   *
   * It basically sets the current map to a live reference of `m`
   *
   * @param {ShortcutMap<T>} keymap map to mirror
   */
  mirror(keymap?: ShortcutMap<T>) {
    keymap && (this.map = keymap);
  }
}
