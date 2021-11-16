<script lang="ts">
  import { focusOn } from "@utils/dom";
  import { keyboardNavigation, KeyMap } from "roving-tab-index/wrappers/svelte";

  let navigationContainer: HTMLElement;
  const array = [...Array(100).keys()];
  const keymap = new KeyMap();

  keymap.attachBehavior(["arrowup", "w"], {
    behavior: (o) => {
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
  <div
    bind:this={navigationContainer}
    use:keyboardNavigation={{
      keymap,
      selector: ".box",
    }}
    class="grid"
  >
    {#each array as item}
      <div class="box" tabindex="0" data-number={item}>{item}</div>
    {/each}
  </div>
</main>

<style lang="scss">
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
