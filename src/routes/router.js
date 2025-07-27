import Login from "../pages/auth/Login.svelte";
import Layout from "../layouts/Layout.svelte";

export default {
  "/login": Login,
  "/dashboard": Layout,
  "/user": Layout,
  "/sensor": Layout,
  "/settings": Layout,
  "*": Login,
};