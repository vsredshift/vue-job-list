<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <footer class="bg-gray-800 text-white py-4 min-h-[60px]">
        <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm">&copy; {{ new Date().getFullYear() }} VSR Jobs. All rights reserved.</p>
            <div class="flex space-x-4 mt-2 md:mt-0">
                <RouterLink to="/jobs" class="hover:underline">Jobs</RouterLink>
                <RouterLink to="/login" class="hover:underline">Login</RouterLink>
                <RouterLink to="/register" class="hover:underline">Register</RouterLink>
                <RouterLink to="#" class="hover:underline">Developers</RouterLink>
                <RouterLink to="#" class="hover:underline">Employers</RouterLink>
            </div>
        </div>
    </footer>
</template>