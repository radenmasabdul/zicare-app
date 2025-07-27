import Dashboard from "../pages/dashboard/Dashboard.svelte";
import UserList from "../pages/user/UserList.svelte";
import SensorList from "../pages/sensor/SensorList.svelte";
import Setting from "../pages/settings/Setting.svelte";

export default {
    "/dashboard": Dashboard,
    "/user": UserList,
    "/sensor": SensorList,
    "/settings": Setting,
};