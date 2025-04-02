<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="text-center flex flex-col justify-center items-center h-96">
        <h1 class="text-6xl font-bold mb-4">My Jobs</h1>
        <p class="text-xl mb-5">Your saved jobs will appear here</p>
        <div class="flex space-x-4">
            <RouterLink to="/" class="text-white bg-emerald-700 hover:bg-emerald-900 rounded-md px-3 py-2">Home</RouterLink>
            <RouterLink to="/jobs" class="text-white bg-blue-700 hover:bg-blue-900 rounded-md px-3 py-2">Back to Jobs</RouterLink>
        </div>
    </section>
</template>
