<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="text-center flex flex-col justify-center items-center h-96">
        <i class="pi pi-lock text-red-500 text-7xl mb-5"></i>
        <h1 class="text-6xl font-bold mb-4">Access Denied</h1>
        <p class="text-xl mb-5">You must be logged in as an employer to add a job post.</p>
        <div class="flex space-x-4">
            <RouterLink to="/" class="text-white bg-emerald-700 hover:bg-emerald-900 rounded-md px-3 py-2">Go Home</RouterLink>
            <RouterLink to="/login" class="text-white bg-blue-700 hover:bg-blue-900 rounded-md px-3 py-2">Login</RouterLink>
        </div>
    </section>
</template>
