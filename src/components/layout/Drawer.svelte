<script>
  import { push } from "svelte-spa-router";

  export let sidebarItems = [];
  export let isDrawerOpen = false;
  export let toggleDrawer;

  let activeItem = sidebarItems[0]?.label || "";

  const handleClick = (item) => {
    activeItem = item.label;
    push(item.path);
  };
</script>

<div class="drawer" class:drawer-open={isDrawerOpen}>
  <input
    id="my-drawer-2"
    type="checkbox"
    class="drawer-toggle"
    bind:checked={isDrawerOpen}
  />

  <div class="drawer-content flex flex-col">
    <slot />
  </div>

  <div class="drawer-side">
    <div
      class="drawer-overlay"
      role="button"
      tabindex="0"
      on:click={toggleDrawer}
      on:keydown={(e) => e.key === "Enter" && toggleDrawer()}
    ></div>

    <ul class="menu p-4 w-80 min-h-full bg-white">
      <h1 class="text-2xl font-bold text-center my-5 text-purple-800">
        ZiCare App
      </h1>

      {#each sidebarItems as item}
        <li>
          <button
            class={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition
              ${
                activeItem === item.label
                  ? "bg-purple-500 text-white font-semibold"
                  : "hover:bg-purple-50 text-gray-800"
              }`}
            on:click={() => handleClick(item)}
          >
            <svelte:component this={item.icon} class="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>
