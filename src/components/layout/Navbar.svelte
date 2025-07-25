<script>
  import { Menu } from "@lucide/svelte";

  export let toggleDrawer;
  let activeItem = "Profile";

  const navbarItems = ["Profile", "Settings", "Logout"];

  const setActive = (item) => {
    activeItem = item;
  };
</script>

<div class="navbar bg-base-100 shadow-sm px-4">
  <div class="flex-1">
    <button
      class="btn btn-ghost btn-circle hover:bg-purple-300"
      on:click={toggleDrawer}
    >
      <Menu />
    </button>
  </div>

  <div class="flex gap-2 items-center">
    <span class="hidden md:inline text-sm font-medium text-gray-700">
      Hi, Abdul
    </span>

    <div class="dropdown dropdown-end">
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost btn-circle avatar hover:bg-purple-800"
      >
        <div class="avatar avatar-placeholder">
          <div class="bg-gray-200 w-8 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 12c2.7 0 4.5-2.2 4.5-4.5S14.7 3 12 3 7.5 5.2 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z"
              />
            </svg>
          </div>
        </div>
      </div>

      <ul
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {#each navbarItems as item}
          <li>
            <button
              on:click={() => setActive(item)}
              class="flex justify-between w-full px-3 py-2 rounded-lg transition
            {activeItem === item
                ? 'bg-purple-500 text-white font-semibold'
                : 'hover:bg-purple-100 text-gray-800'}"
            >
              {item}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
