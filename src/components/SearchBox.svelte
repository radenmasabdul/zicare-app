<script>
  export let value;
  export let onInput = () => {};
</script>

<label
  class="input input-bordered border-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 text-white placeholder-purple-300 bg-white/10 backdrop-blur-sm transition-all duration-300"
>
  <svg
    class="h-5 w-5 opacity-60 text-purple-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>

  <input
    type="search"
    name="search"
    id="search"
    placeholder="Search..."
    bind:value
    on:input={onInput}
    class="bg-transparent text-black placeholder-black focus:outline-none w-full"
  />
</label>
