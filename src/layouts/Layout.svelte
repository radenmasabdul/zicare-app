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
  const toggleDrawer = () => {
    isDrawerOpen = !isDrawerOpen;
  };

  onMount(() => {
    // opsional: redirect ke login kalau belum login
    const isLoggedIn = true; // nanti kamu bisa ganti ini dengan cek token
    if (!isLoggedIn) push("/login");
  });
</script>

<Drawer {sidebarItems} {isDrawerOpen} {toggleDrawer}>
  <Navbar {toggleDrawer} />
  <div class="bg-base-200 min-h-screen">
    <Content>
      <Router routes={layoutRoutes} />
    </Content>
  </div>
</Drawer>
