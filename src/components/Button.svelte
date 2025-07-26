<script>
  // @ts-nocheck
  export let label = "";
  export let icon = null;
  export let onClick = () => {};
  export let size = "md";
  export let variant = "primary";
  export let tooltip = "";
  export let iconColor = "text-white";
</script>

<button
  class={`btn ${variant ? `btn-${variant}` : "btn-primary"} ${size === "sm" ? "btn-sm" : ""} gap-2`}
  on:click={onClick}
  title={tooltip}
>
  {#if icon}
    <svelte:component this={icon} class={`w-4 h-4 ${iconColor}`} />
  {/if}
  {#if label}
    <span>{label}</span>
  {/if}
</button>
