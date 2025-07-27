<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Swal from "sweetalert2";
  import {
    createSensor,
    updateSensor,
    getLocationSensor,
    getLocationParameter,
  } from "../../utils/endpoints/sensor";

  export let mode = "add";
  export let sensor = {};
  const dispatch = createEventDispatcher();

  let parameterOptions = [];
  let locationOptions = [];

  let selectedLocation = "";
  let selectedParameter = "";
  let nilai = "";
  let unit = "";
  let recordedAt = "";

  onMount(async () => {
    parameterOptions = await getLocationParameter();
    locationOptions = await getLocationSensor();

    if (sensor && Object.keys(sensor).length > 0) {
      const locObj = locationOptions.find(
        (loc) => loc.name === sensor.location
      );
      selectedLocation = locObj ? locObj.id : "";

      const paramObj = parameterOptions.find(
        (p) => p.name === sensor.parameter
      );
      selectedParameter = paramObj ? paramObj.id : "";

      nilai = sensor.value ?? "";
      unit = sensor.unit ?? "";
      recordedAt = sensor.recordedAt ? sensor.recordedAt.slice(0, 10) : "";
    }
  });

  $: if (selectedParameter && parameterOptions.length > 0) {
    const param = parameterOptions.find((p) => p.id == selectedParameter);
    unit = param?.unit ?? "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLocation) {
      Swal.fire("Error", "Lokasi harus dipilih.", "error");
      return;
    }
    if (!selectedParameter) {
      Swal.fire("Error", "Parameter harus dipilih.", "error");
      return;
    }
    if (nilai === "" || isNaN(parseFloat(nilai))) {
      Swal.fire("Error", "Nilai harus diisi dengan angka valid.", "error");
      return;
    }
    if (!recordedAt) {
      Swal.fire("Error", "Tanggal Recorded At harus diisi.", "error");
      return;
    }

    let valueParsed = parseFloat(nilai);

    const data = {
      locationId: selectedLocation,
      parameterId: selectedParameter,
      value: valueParsed,
      recordedAt: recordedAt,
    };

    try {
      if (mode === "add") {
        await createSensor(data);
        Swal.fire("Berhasil", "Sensor berhasil ditambahkan", "success");
      } else if (mode === "edit") {
        await updateSensor(sensor.id, data);
        Swal.fire("Berhasil", "Sensor berhasil diperbarui", "success");
      }
      dispatch("close");
    } catch (err) {
      Swal.fire("Error", "Gagal simpan sensor", "error");
    }
  };
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
      class="select select-bordered w-full"
      required
    >
      <option disabled value="">Select Location</option>
      {#each locationOptions as loc}
        <option value={loc.id}>{loc.name}</option>
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
      class="select select-bordered w-full"
      required
    >
      <option disabled value="">Select Parameter</option>
      {#each parameterOptions as p}
        <option value={p.id}>{p.name}</option>
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
      type="number"
      placeholder="Enter value"
      class="input input-bordered w-full"
      required
      step="any"
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
      readonly
      disabled
      class="input input-bordered w-full bg-gray-100"
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
      class="input input-bordered w-full"
      required
    />
  </div>
</form>
