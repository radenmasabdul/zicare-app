<script>
  export let mode = "add";
  export let sensor = {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const parameterOptions = [
    { name: "Temperature", unit: "°C" },
    { name: "Humidity", unit: "%" },
    { name: "CO2", unit: "ppm" },
  ];

  const locationOptions = [
    "Building A - Floor 1",
    "Building B - Floor 2",
    "Warehouse - Zone C",
  ];

  let selectedLocation = sensor.location ?? "";
  let selectedParameter = sensor.parameter ?? "";
  let nilai = sensor.value ?? "";
  let unit = sensor.unit ?? "";
  let recordedAt = sensor.recordAt?.slice(0, 10) ?? "";
</script>

<form
  on:submit={handleSubmit}
  class="space-y-1"
  id="sensorForm"
  name="sensorForm"
>
  <div class="form-control">
    <label class="label" for="location">
      <span class="label-text text-black pb-1">Location</span>
    </label>
    <select
      bind:value={selectedLocation}
      disabled={mode === "view"}
      id="location"
      class="select select-bordered w-full border-purple-500 bg-white/10 text-black backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <option disabled selected>Select Location</option>
      {#each locationOptions as loc}
        <option value={loc}>{loc}</option>
      {/each}
    </select>
  </div>

  <div class="form-control">
    <label class="label" for="parameter">
      <span class="label-text text-black pb-1">Parameter</span>
    </label>
    <select
      bind:value={selectedParameter}
      disabled={mode === "view"}
      id="parameter"
      class="select select-bordered w-full border-purple-500 bg-white/10 text-black backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <option disabled selected>Select Parameter</option>
      {#each parameterOptions as p}
        <option value={p.name}>{p.name}</option>
      {/each}
    </select>
  </div>

  <div class="form-control">
    <label class="label" for="value">
      <span class="label-text text-black pb-1">Value</span>
    </label>
    <input
      bind:value={nilai}
      disabled={mode === "view"}
      id="value"
      type="text"
      placeholder="Enter value"
      class="input input-bordered w-full border-purple-500 bg-white/10 text-black backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <div class="form-control">
    <label class="label" for="unit">
      <span class="label-text text-black pb-1">Unit</span>
    </label>
    <input
      bind:value={unit}
      id="unit"
      type="text"
      readonly={mode === "view"}
      class="input input-bordered w-full bg-gray-100 text-black"
      disabled
    />
  </div>

  <div class="form-control">
    <label class="label" for="recordedAt">
      <span class="label-text text-black pb-1">Recorded At</span>
    </label>
    <input
      bind:value={recordedAt}
      disabled={mode === "view"}
      id="recordedAt"
      type="date"
      class="input input-bordered w-full border-purple-500 bg-white/10 text-black backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
</form>
