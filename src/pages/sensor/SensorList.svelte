<script>
  import Button from "../../components/Button.svelte";
  import DataTable from "../../components/DataTable.svelte";
  import Export from "../../components/Export.svelte";
  import Pagination from "../../components/Pagination.svelte";
  import SearchBox from "../../components/SearchBox.svelte";
  import Modal from "../../components/Modal.svelte";
  import SensorForm from "./SensorForm.svelte";

  import Swal from "sweetalert2";
  import { Eye, Edit, Trash2, Plus, Search, ListRestart } from "@lucide/svelte";
  import { getAllSensor, deleteSensor } from "../../utils/endpoints/sensor";

  import moment from "moment";

  let search = "";
  let showModal = false;
  let modalMode = "add";
  let selectedSensor = {};

  let sensorData = [];
  let currentPage = 1;
  let perPage = 10;
  let totalItems = 0;
  let isLoading = false;

  async function fetchSensors() {
    isLoading = true;
    try {
      const res = await getAllSensor({
        search,
        page: currentPage,
        limit: perPage,
      });
      sensorData = res.data ?? [];
      totalItems = res.totalData;
    } catch (err) {
      Swal.fire("Error", "Gagal mengambil data sensor", "error");
    } finally {
      isLoading = false;
    }
  }

  const handleAddSensor = () => {
    showModal = true;
    modalMode = "add";
    selectedSensor = {};
  };

  const handleView = (sensor) => {
    showModal = true;
    modalMode = "view";
    selectedSensor = sensor;
  };

  const handleEdit = (sensor) => {
    showModal = true;
    modalMode = "edit";
    selectedSensor = sensor;
  };

  const handleDelete = async (sensor) => {
    const confirm = await Swal.fire({
      title: "Yakin hapus sensor?",
      text: `${sensor.parameter} - ${sensor.location}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteSensor(sensor.id);
        Swal.fire("Berhasil!", "Sensor berhasil dihapus.", "success");
        fetchSensors();
      } catch (err) {
        Swal.fire("Error", "Gagal menghapus sensor.", "error");
      }
    }
  };

  const handleSearch = () => {
    currentPage = 1;
    fetchSensors();
  };

  const handleReset = () => {
    search = "";
    currentPage = 1;
    fetchSensors();
  };

  $: if (currentPage) {
    fetchSensors();
  }

  const actions = [
    { icon: Eye, title: "View", handler: handleView },
    { icon: Edit, title: "Edit", handler: handleEdit },
    { icon: Trash2, title: "Delete", handler: handleDelete, variant: "error" },
  ];

  const columns = [
    { key: "no", label: "No" },
    { key: "location", label: "Location" },
    { key: "parameter", label: "Parameter" },
    { key: "value", label: "Value" },
    { key: "unit", label: "Unit" },
    { key: "recordedAt", label: "Last Update" },
  ];

  $: sensorDataFormatted = sensorData.map((item, index) => ({
    ...item,
    no: index + 1,
    recordedAt: moment(item.recordedAt).format("YYYY-MM-DD"),
  }));
</script>

<div class="space-y-8">
  <div class="flex flex-col lg:flex-row justify-between gap-4">
    <div class="flex gap-4 flex-1">
      <SearchBox bind:value={search} />
      <Button label="Cari" icon={Search} onClick={handleSearch} />
      <Button label="Reset" icon={ListRestart} onClick={handleReset} />
    </div>
    <div class="flex gap-3">
      <Export
        onClick={() =>
          Swal.fire("Export", "Fitur belum diimplementasi", "info")}
      />
      <Button label="Add Sensor" icon={Plus} onClick={handleAddSensor} />
    </div>
  </div>

  {#if isLoading}
    <div class="flex justify-center py-10">
      <div
        class="animate-spin border-4 border-purple-600 border-t-transparent rounded-full w-10 h-10"
        aria-label="Loading"
      ></div>
    </div>
  {:else}
    <DataTable {columns} rows={sensorDataFormatted} {actions} />

    <Pagination
      {currentPage}
      total={totalItems}
      {perPage}
      onNext={() => currentPage++}
      onPrev={() => currentPage--}
      on:pageChange={(e) => (currentPage = e.detail)}
    />
  {/if}

  <Modal
    title="Sensor"
    formId="sensorForm"
    open={showModal}
    mode={modalMode}
    onClose={() => {
      showModal = false;
      fetchSensors();
    }}
  >
    <SensorForm
      mode={modalMode}
      sensor={selectedSensor}
      on:close={() => {
        showModal = false;
        fetchSensors();
      }}
    />
  </Modal>
</div>

<style>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>
