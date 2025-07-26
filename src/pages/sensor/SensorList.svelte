<script>
  import Button from "../../components/Button.svelte";
  import DataTable from "../../components/DataTable.svelte";
  import Export from "../../components/Export.svelte";
  import Filter from "../../components/Filter.svelte";
  import Pagination from "../../components/Pagination.svelte";
  import SearchBox from "../../components/SearchBox.svelte";
  import Modal from "../../components/Modal.svelte";
  import SensorForm from "./SensorForm.svelte";

  import { Eye, Edit, Trash2, Plus } from "@lucide/svelte";

  let search = "";
  let selectedLocation = "All";
  let showModal = false;
  let modalMode = "add";
  let selectedSensor = {};

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
    {
      id: 3,
      no: 3,
      location: "Warehouse - Zone C",
      parameter: "CO2",
      unit: "ppm",
      value: 400,
      recordAt: "2024-01-26 14:28:30",
      status: "critical",
      trend: "up",
    },
    {
      id: 4,
      no: 4,
      location: "Building A - Floor 2",
      parameter: "Temperature",
      unit: "°C",
      value: 26.1,
      recordAt: "2024-01-26 14:27:10",
      status: "normal",
      trend: "up",
    },
    {
      id: 5,
      no: 5,
      location: "Building B - Floor 2",
      parameter: "Humidity",
      unit: "%",
      value: 55.8,
      recordAt: "2024-01-26 14:25:00",
      status: "normal",
      trend: "down",
    },
    {
      id: 6,
      no: 6,
      location: "Warehouse - Zone D",
      parameter: "CO2",
      unit: "ppm",
      value: 800,
      recordAt: "2024-01-26 14:23:20",
      status: "warning",
      trend: "up",
    },
    {
      id: 7,
      no: 7,
      location: "Building A - Floor 3",
      parameter: "Temperature",
      unit: "°C",
      value: 22.0,
      recordAt: "2024-01-26 14:22:00",
      status: "normal",
      trend: "down",
    },
    {
      id: 8,
      no: 8,
      location: "Building B - Floor 3",
      parameter: "Humidity",
      unit: "%",
      value: 68.5,
      recordAt: "2024-01-26 14:20:10",
      status: "critical",
      trend: "up",
    },
    {
      id: 9,
      no: 9,
      location: "Warehouse - Zone E",
      parameter: "CO2",
      unit: "ppm",
      value: 350,
      recordAt: "2024-01-26 14:18:50",
      status: "normal",
      trend: "down",
    },
    {
      id: 10,
      no: 10,
      location: "Building A - Floor 4",
      parameter: "Temperature",
      unit: "°C",
      value: 27.3,
      recordAt: "2024-01-26 14:17:05",
      status: "warning",
      trend: "up",
    },
    {
      id: 11,
      no: 11,
      location: "Building B - Floor 4",
      parameter: "Humidity",
      unit: "%",
      value: 60.0,
      recordAt: "2024-01-26 14:15:30",
      status: "normal",
      trend: "down",
    },
    {
      id: 12,
      no: 12,
      location: "Warehouse - Zone F",
      parameter: "CO2",
      unit: "ppm",
      value: 950,
      recordAt: "2024-01-26 14:14:10",
      status: "critical",
      trend: "up",
    },
  ];

  const locations = [
    ...new Set(sensorData.map((s) => s.location.split(" - ")[0])),
  ];

  let currentPage = 1;
  let perPage = 10;

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
    showModal = true;
    modalMode = "add";
    selectedSensor = {};
  };

  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleView = (sensor) => {
    console.log("View:", sensor.parameter);
    showModal = true;
    modalMode = "view";
    selectedSensor = sensor;
  };

  const handleEdit = (sensor) => {
    console.log("Edit:", sensor.parameter);
    showModal = true;
    modalMode = "edit";
    selectedSensor = sensor;
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
    on:pageChange={(e) => (currentPage = e.detail)}
  />

  <Modal
    title="Sensor"
    formId="sensorForm"
    open={showModal}
    mode={modalMode}
    onClose={() => (showModal = false)}
  >
    <SensorForm mode={modalMode} sensor={selectedSensor} />
  </Modal>
</div>

<style></style>
