<script>
  import { createEventDispatcher } from "svelte";
  export let currentPage = 1;
  export let total = 0;
  export let perPage = 10;
  export let onNext;
  export let onPrev;

  const dispatch = createEventDispatcher();
  const totalPages = Math.ceil(total / perPage);

  const goToPage = (page) => {
    dispatch("pageChange", page);
  };

  $: start = (currentPage - 1) * perPage + 1;
  $: end = Math.min(currentPage * perPage, total);
</script>

<div class="flex flex-col lg:flex-row items-center justify-between mt-6">
  <div class="text-sm text-gray-500 mb-3 lg:mb-0">
    Showing {total === 0 ? 0 : start} to {end} of {total} entries
  </div>

  <div class="join">
    <button
      class="join-item btn btn-sm"
      on:click={onPrev}
      disabled={currentPage <= 1}
    >
      Prev
    </button>

    {#each Array(totalPages)
      .fill(0)
      .map((_, i) => i + 1) as page}
      <button
        class={`join-item btn btn-sm ${currentPage === page ? "btn-active btn-primary" : ""}`}
        on:click={() => goToPage(page)}
      >
        {page}
      </button>
    {/each}

    <button
      class="join-item btn btn-sm"
      on:click={onNext}
      disabled={currentPage >= totalPages}
    >
      Next
    </button>
  </div>
</div>
