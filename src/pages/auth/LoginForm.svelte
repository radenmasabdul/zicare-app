<script>
  import { Eye, EyeOff, Mail, Lock, LogIn } from "@lucide/svelte";
  import { useLogin } from "../../hooks/useLogin";

  const {
    email,
    password,
    showPassword,
    togglePasswordVisibility,
    handleSubmit,
    isLoading,
  } = useLogin();
</script>

<div
  class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8"
  style="background-image: url({wallpaper}); background-size: cover; background-position: center;"
>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="text-center p-5">
          <div
            class="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <LogIn class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl font-bold">Welcome Back</h1>
          <p class="text-sm">Sign in to continue</p>
        </div>

        <form class="space-y-5" on:submit={handleSubmit}>
          <div class="relative">
            <Mail
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              type="email"
              id="email"
              name="email"
              autocomplete="email"
              placeholder="Email"
              required
              class="w-full py-3 pl-10 pr-3 bg-white/5 placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/5 focus:shadow-none"
              bind:value={$email}
            />
          </div>

          <div class="relative">
            <Lock
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            />

            <input
              type={$showPassword ? "text" : "password"}
              bind:value={$password}
              id="password"
              name="password"
              autocomplete="current-password"
              placeholder="Password"
              required
              class="w-full py-3 pl-10 pr-12 bg-white/5 placeholder-gray-400 rounded-lg border border-gray-600
           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/5 focus:shadow-none"
            />

            <button
              type="button"
              on:click={togglePasswordVisibility}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {#if showPassword}
                <EyeOff class="w-5 h-5" />
              {:else}
                <Eye class="w-5 h-5" />
              {/if}
            </button>
          </div>

          <div class="card-actions">
            <button
              type="submit"
              disabled={$isLoading}
              class="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
            >
              {#if $isLoading}
                <svg
                  class="animate-spin h-5 w-5 mx-auto"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 100 16v-4l-4 4 4 4v-4a8 8 0 01-8-8z"
                  />
                </svg>
              {:else}
                Sign In
              {/if}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
