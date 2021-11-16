# svelte-keyboard-navigation

A lightweight Svelte action to add keyboard navigation to your Svelte app.

## Features

- 📦 Tiny: [SIZE] min+gzip
- ⚛️ Reactive: Change key combinations on-the-fly
- 😀 Simple: Easy-to-use API

## Installation

```bash
pnpm add svelte-keyboard-navigation

# ... or with npm
npm install --save svelte-keyboard-navigation

# ... or with yarn
yarn add svelte-keyboard-navigation
```

## Usage

### Basic usage

```svelte
<script>
  import { keyboardNavigation, KeyCombo, KeyMap } from "mylib/wrappers/svelte";

  const stringSelected = `Selected; press Shift+A to change`;
  const stringUnselected = `Not selected; press A to change`;

  // define our keymap...
  const keymap = new KeyMap();

  // ... and attach a behavior to it, which is invoked when "a" is pressed
  keymap.attachBehavior(["a"], {
    behavior: (options) => {
      const { element } = options.target;
      element.innerText = stringSelected;
      element.style.background = "#66BB6A";
    },
    stack: false,
  });
  // attach another behavior to it, which is invoked when "shift" and "a" are
  // pressed together
  // we'll use the `KeyCombo` class for that
  keymap.attachBehavior([new KeyCombo("shift", "a")], {
    behavior: (options) => {
      const { element } = options.target;
      element.innerText = stringUnselected;
      element.style.background = "#EF5350";
    },
    stack: false,
  });
</script>

<div
  use:keyboardNavigation={{
    // our keymap
    keymap,
    // ... and a selector that can select any direct child of this `div`
    selector: ".child",
  }}
>
  <div tabindex="0" class="child">Click me and press "A"/"Shift+A"</div>
</div>

<!-- some styling to make it look good -->
<style>
  div.child {
    background: #42a5f5;
    font-family: sans-serif;
    outline: 0.25rem solid black;
    padding: 2.5rem;
  }
</style>
```

### Attaching a Behavior

To attach a behavior that executes when, say, "A" or "B" is pressed, do:

```svelte
keymap.attachBehavior(["A", "B"], {
  behavior: () => {
    // do cool stuff
  },
  stack: false,
});
```

### Detaching a Behavior

To detach/remove a behavior, for example, the behavior that executes when "A" is pressed in the [basic usage](#basic-usage), do:

```svelte
keymap.detachBehavior(["A"]);
```

### Duplicating a Keymap

```svelte
// we want to copy `keymap1` into `keymap2`
keymap2.copy(keymap1);

// alternate method
const keymap2 = new KeyMap(keymap1);
```

### Preventing Default Browser Behavior

Sometimes, you may want to prevent default browser behavior from running (for example, adding a custom save prompt box). You can disable it when attaching the behavior:

```svelte
keymap.attachBehavior([...], {
  behavior: ...,
  stack: ...,
  // disable default browser behavior
  preventsDefault: true,
});
```

### Using Key Combos

Currently, key combos of type `<modifier key^> + <alphanumeric key>` are supported. To use such a combination, do:

```svelte
import { KeyCombo } from "svelte-keyboard-navigation";
...
keymap.attachBehavior([
  new KeyCombo("<your modifier key>", "<your alphanumeric key>")
], ...);
```

^ [Modifier key (Wikipedia)](https://en.wikipedia.org/wiki/Modifier_key)

### Behavior ➡️ `options.target.position`

To use `options.target.position` in the behavior arguments, you'll have to define `data-number` property on every element that your selector can select. See the [Svelte demo's source](../../demo/svelte/src/App.svelte) for an example.

## API Reference

Will be available soon.
<!-- See the [docs](../../docs/) -->

## Demos

Note: You'll need [pnpm](https://pnpm.io/) installed to run the demo.

Run a live demo on your local machine. Run the following commands:

```bash
git clone https://github.com/harshulvijay/keyboard-navigation
cd keyboard-navigation/demo
pnpm lib:install # installs the library
pnpm dev:svelte # starts the Svelte demo
```

Open the URL that you see in the terminal to see the demo.

## Contributing

Feel free to [open an issue](https://github.com/harshulvijay/keyboard-navigation/issues/new/choose) with feature requests/bug reports.

**Note:** Please create an issue before opening a PR.

## License

[License](LICENSE.md)
