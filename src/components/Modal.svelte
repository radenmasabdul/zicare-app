<script>
  export let title = "";
  export let open = false;
  export let onClose = () => {};
  export let formId = "";
  export let mode = "add";
</script>

{#if open}
  <div
    class="modal modal-open bg-black/40 backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="modal-box bg-white text-black max-w-md w-full">
      <h3 class="font-bold text-lg mb-2">
        {#if mode === "add"}
          Add {title}
        {:else if mode === "edit"}
          Edit {title}
        {:else if mode === "view"}
          {title} Details
        {/if}
      </h3>

      <div class="divider m-0 before:bg-purple-500 after:bg-purple-500"></div>

      <slot />

      <div class="modal-action mt-6 flex justify-end gap-2">
        <button class="btn btn-error text-white" on:click={onClose}>
          {mode === "view" ? "Close" : "Cancel"}
        </button>

        {#if mode !== "view"}
          <button
            class="btn btn-success text-white"
            type="submit"
            form={formId}
          >
            {mode === "add" ? "Submit" : "Update"}
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}
