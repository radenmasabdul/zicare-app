<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import Router from "svelte-spa-router";
  import Navbar from "../components/layout/Navbar.svelte";
  import Drawer from "../components/layout/Drawer.svelte";
  import Content from "../components/layout/Content.svelte";
  import layoutRoutes from "../routes/layoutRoutes";
  import { LayoutDashboard, Users, Activity, Settings } from "@lucide/svelte";

  const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Users", icon: Users, path: "/user" },
    { label: "Sensors", icon: Activity, path: "/sensor" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  let isDrawerOpen = true;
  let isAuthenticated = false;
  let isChecking = true;

  const toggleDrawer = () => {
    isDrawerOpen = !isDrawerOpen;
  };

  onMount(() => {
    const token = localStorage.getItem("token");

    if (token) {
      isAuthenticated = true;
    } else {
      push("/login");
    }

    isChecking = false;
  });
</script>

{#if isChecking}
  <div class="flex justify-center items-center h-screen">
    <span class="loading loading-spinner loading-lg text-primary"></span>
  </div>
{:else if isAuthenticated}
  <Drawer {sidebarItems} {isDrawerOpen}>
    <Navbar {toggleDrawer} />
    <div class="bg-base-200 min-h-screen">
      <Content>
        <Router routes={layoutRoutes} />
      </Content>
    </div>
  </Drawer>
{/if}
