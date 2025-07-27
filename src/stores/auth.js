import { writable } from "svelte/store";

export const auth = writable({
    token: localStorage.getItem("token"),
    user: null,
    isLoggedIn: !!localStorage.getItem("token"),
});