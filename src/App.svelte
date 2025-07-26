<script>
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { queryClient } from "./utils/helpers/queryClient.js";
  import Router from "svelte-spa-router";
  import routes from "./routes/router";
</script>

<QueryClientProvider client={queryClient}>
  <Router {routes} useHash={true} />
</QueryClientProvider>

<style></style>
