<script lang="ts">
  import { focusOn } from "@utils/dom";
  import { keyboardNavigation, KeyMap } from "mylib/wrappers/svelte";

  // the element on which the action will be listening for key presses
  let navigationContainer: HTMLElement;
  // create an array of numbers from 0 to 99
  const array = [...Array(100).keys()];

  // create a keymap
  const keymap = new KeyMap();

  // attach a new behavior
  keymap.attachBehavior(["arrowup", "w"], {
    // this function will execute when either "w" or the "arrowup" key is
    // pressed
    behavior: (o) => {
      // `o` contains some properties that may be useful, for example, 
      // `position` if the element that's being focused on has a `data-number`
      // property
      const next = o.target.position - o.elements;
      focusOn(navigationContainer, "number", next);
    },
    stack: false,
  });
  keymap.attachBehavior(["arrowdown", "s"], {
    behavior: (o) => {
      const next = o.target.position + o.elements;
      focusOn(navigationContainer, "number", next);
    },
    stack: false,
  });
  keymap.attachBehavior(["arrowleft", "a"], {
    behavior: (o) => {
      const next = o.target.position - 1;
      focusOn(navigationContainer, "number", next);
    },
    stack: false,
  });
  keymap.attachBehavior(["arrowright", "d"], {
    behavior: (o) => {
      const next = o.target.position + 1;
      focusOn(navigationContainer, "number", next);
    },
    stack: false,
  });
</script>

<main>
  <!-- bind this `div` to the `navigationContainer` variable -->
  <!-- the `keyboardNavigation` action will listen for key presses on this 
    element -->
  <div
    bind:this={navigationContainer}
    use:keyboardNavigation={{
      // pass the keymap that we defined earlier
      keymap,
      // will work for all elements that have a class `box`
      // note: currently, all `.box`es need to have the same width, as it is,
      // as of now, a limitation of the svelte action
      selector: ".box",
    }}
    class="grid"
  >
    {#each array as item}
      <div class="box" tabindex="0" data-number={item + 1}>{item + 1}</div>
    {/each}
  </div>
</main>

<style lang="scss">
  // styling

  $box-color: #f44336;
  $box-focused-outline-color: #2196f3;

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;

    .box {
      align-items: center;
      background-color: lighten($box-color, 25);
      box-sizing: border-box;
      border: 0.25rem solid black;
      display: flex;
      font-size: 1.25rem;
      height: 5rem;
      justify-content: center;
      margin: 0.75rem;
      outline: none;
      padding: 1.75rem;
      width: 5rem;

      &:focus {
        background-color: $box-color;
        border: none;
        outline: 0.25rem solid $box-focused-outline-color;
      }
    }
  }
</style>
