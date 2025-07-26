<script>
  import Button from "../../components/Button.svelte";
  import DataTable from "../../components/DataTable.svelte";
  import Export from "../../components/Export.svelte";
  import Filter from "../../components/Filter.svelte";
  import Pagination from "../../components/Pagination.svelte";
  import SearchBox from "../../components/SearchBox.svelte";

  import { Eye, Edit, Trash2, Plus } from "@lucide/svelte";

  let search = "";
  let selectedLocation = "All";

  let sensorData = [
    {
      id: 1,
      no: 1,
      location: "Building A - Floor 1",
      parameter: "Temperature",
      unit: "°C",
      value: 23.5,
      recordAt: "2024-01-26 14:30:15",
      status: "normal",
      trend: "up",
    },
    {
      id: 2,
      no: 2,
      location: "Building B - Floor 1",
      parameter: "Humidity",
      unit: "%",
      value: 65.2,
      recordAt: "2024-01-26 14:29:45",
      status: "warning",
      trend: "down",
    },
  ];

  const locations = [
    ...new Set(sensorData.map((s) => s.location.split(" - ")[0])),
  ];

  let currentPage = 1;
  let perPage = 5;

  $: filtered = sensorData.filter(
    (s) =>
      (s.location.toLowerCase().includes(search.toLowerCase()) ||
        s.parameter.toLowerCase().includes(search.toLowerCase())) &&
      (selectedLocation === "All" || s.location.includes(selectedLocation))
  );

  $: paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const columns = [
    { key: "no", label: "No" },
    { key: "location", label: "Location" },
    { key: "parameter", label: "Parameter" },
    { key: "value", label: "Value" },
    { key: "unit", label: "Unit" },
    { key: "status", label: "Status" },
    { key: "recordAt", label: "Last Update" },
  ];

  const handleAddSensor = () => {
    console.log("Add sensor clicked");
  };

  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleView = (sensor) => {
    console.log("View:", sensor.parameter);
  };

  const handleEdit = (sensor) => {
    console.log("Edit:", sensor.parameter);
  };

  const handleDelete = (sensor) => {
    console.log("Deleted:", sensor.parameter);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filtered.length / perPage)) currentPage++;
  };

  const prevPage = () => {
    if (currentPage > 1) currentPage--;
  };

  const actions = [
    { icon: Eye, title: "View", handler: handleView, variant: "info" },
    { icon: Edit, title: "Edit", handler: handleEdit, variant: "warning" },
    { icon: Trash2, title: "Delete", handler: handleDelete, variant: "error" },
  ];
</script>

<div class="space-y-8">
  <div class="flex flex-col lg:flex-row justify-between gap-4">
    <div class="flex gap-4 flex-1">
      <SearchBox bind:value={search} />
      <Filter
        options={["All", ...locations]}
        bind:selected={selectedLocation}
      />
    </div>
    <div class="flex gap-3">
      <Export onClick={handleExport} />
      <Button label="Add Sensor" icon={Plus} onClick={handleAddSensor} />
    </div>
  </div>

  <DataTable {columns} rows={paginated} {actions} />

  <Pagination
    {currentPage}
    total={filtered.length}
    {perPage}
    onNext={nextPage}
    onPrev={prevPage}
  />
</div>

<style></style>
