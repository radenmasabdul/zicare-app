<script>
  import { Download } from "@lucide/svelte";
  export let onClick = () => {};
</script>

<button class="btn btn-success gap-2 text-white" on:click={onClick}>
  <Download class="w-4 h-4 text-white" />
  Export
</button>
