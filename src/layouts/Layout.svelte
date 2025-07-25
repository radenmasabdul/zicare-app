<script>
  import Navbar from "../components/layout/Navbar.svelte";
  import Drawer from "../components/layout/Drawer.svelte";
  import Content from "../components/layout/Content.svelte";

  import { LayoutDashboard, Users, Activity, Settings } from "@lucide/svelte";

  const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Users", icon: Users },
    { label: "Sensors", icon: Activity },
    { label: "Settings", icon: Settings },
  ];

  let isDrawerOpen = true;
  const toggleDrawer = () => {
    isDrawerOpen = !isDrawerOpen;
  };
</script>

<Drawer {sidebarItems} {isDrawerOpen} {toggleDrawer}>
  <Navbar {toggleDrawer} />
  <div class="bg-base-200 min-h-screen">
    <Content>
      <slot />
    </Content>
  </div>
</Drawer>
