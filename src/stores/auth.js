import { writable } from "svelte/store";
import { createMutation } from "@tanstack/svelte-query";
import { login, register } from "../utils/endpoints/auth.js";

export const auth = writable({
    token: localStorage.getItem("token"),
    user: null,
    isLoggedIn: !!localStorage.getItem("token"),
});

export const loginMutation = createMutation({
    mutationFn: login,
    onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        auth.set({
            token: data.token,
            user: data.user || null,
            isLoggedIn: true,
        });
    }
})

export const registerMutation = createMutation({
    mutationFn: register,
})