<script>
  export let options = [];
  export let selected = "All";
  export let onChange = () => {};
</script>

<label
  class="input input-bordered border-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 text-white bg-white/10 backdrop-blur-sm transition-all duration-300"
>
  <select
    name="select"
    id="select"
    bind:value={selected}
    on:change={onChange}
    class="bg-transparent text-black focus:outline-none w-full appearance-none"
  >
    {#each options as opt}
      <option value={opt}>{opt}</option>
    {/each}
  </select>
</label>
