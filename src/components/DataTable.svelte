<script>
  import Button from "../components/Button.svelte";
  export let columns = [];
  export let rows = [];
  export let actions = [];
</script>

<div class="overflow-x-auto">
  <table class="table table-zebra bg-base-100 rounded-xl">
    <thead class="text-base-content">
      <tr>
        {#each columns as column}
          <th>{column.label}</th>
        {/each}
        {#if actions.length}
          <th class="text-center">Actions</th>
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each columns as column}
            <td>{row[column.key]}</td>
          {/each}
          {#if actions.length}
            <td class="text-center">
              <div class="flex justify-center gap-2">
                {#each actions as action}
                  <Button
                    onClick={() => action.handler(row)}
                    icon={action.icon}
                    size="sm"
                    variant={action.variant}
                    tooltip={action.title}
                  />
                {/each}
              </div>
            </td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>

  {#if rows.length === 0}
    <div class="text-center text-sm text-gray-400 py-6">Data not found</div>
  {/if}
</div>
