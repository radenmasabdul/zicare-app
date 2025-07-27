// @ts-nocheck
import { push } from "svelte-spa-router";
import { writable, get, derived } from "svelte/store";
import { createMutation } from "@tanstack/svelte-query";
import { login } from "../utils/endpoints/auth";
import { auth } from "../stores/auth";
import * as yup from "yup";
import Swal from "sweetalert2";

export function useLogin() {
    const email = writable("");
    const password = writable("");
    const showPassword = writable(false);

    const schema = yup.object({
        email: yup.string().email("Format email tidak valid").required("Email wajib diisi"),
        password: yup.string().min(8, "Minimal 8 karakter").required("Password wajib diisi"),
    });

    const mutation = createMutation({
        mutationFn: login,

        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.user.name);
            auth.set({
                token: data.token,
                user: data.user || null,
                isLoggedIn: true,
            });
            Swal.fire("Berhasil", "Login berhasil!", "success");
            push("/dashboard");
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Terjadi kesalahan saat login";
            Swal.fire("Gagal", message, "error");
        },
    });

    const togglePasswordVisibility = () => {
        showPassword.update((v) => !v);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const values = await schema.validate(
                { email: get(email), password: get(password) },
                { abortEarly: false }
            );

            get(mutation).mutate(values);
        } catch (err) {
            if (err.name === "ValidationError") {
                const messages = err.inner.map((e) => e.message).join("<br>");
                Swal.fire("Validasi Gagal", messages, "error");
            } else {
                Swal.fire("Error", "Terjadi kesalahan saat validasi", "error");
            }
        }
    };

    const isLoading = derived(mutation, ($m) => $m.isPending);
    const error = derived(mutation, ($m) => $m.error);

    return {
        email,
        password,
        showPassword,
        togglePasswordVisibility,
        handleSubmit,
        isLoading,
        error,
    };
}
