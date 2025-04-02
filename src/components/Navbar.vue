<script setup>
import { RouterLink, useRoute } from "vue-router";
import logo from "@/assets/img/logo.png"
import { user } from "@/lib/stores/user";
import { computed } from "vue";

const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path === routePath;
}

const isAdmin = computed(() => user.current?.prefs.role === "admin");
const isDeveloper = computed(() => user.current?.prefs.role === "developer");
const isEmployer = computed(() => user.current?.prefs.role === "employer");
</script>

<template>
    <nav class="bg-emerald-700 border-b border-emerald-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
                        <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
                        <span class="hidden md:block text-white text-2xl font-bold ml-4">VSR Jobs</span>
                    </RouterLink>
                    <template v-if="user.current">
                        <div class="hidden md:flex gap-1 items-center text-white ml-2">
                            <span>{{ user.current.name || user.current.email }}</span>
                        </div>
                    </template>
                    <div class="md:ml-auto">
                        <div class="flex space-x-2">
                            <RouterLink to="/" :class="[isActiveLink('/')
                                ? 'bg-emerald-900'
                                : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3', 'py-2', 'rounded-md'
                            ]">Home</RouterLink>
                            <RouterLink to="/jobs" :class="[isActiveLink('/jobs')
                                ? 'bg-emerald-900'
                                : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3', 'py-2', 'rounded-md'
                            ]">Jobs
                            </RouterLink>
                            <RouterLink v-if="isEmployer || isAdmin" to="/jobs/add" :class="[isActiveLink('/jobs/add')
                                ? 'bg-emerald-900'
                                : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3', 'py-2', 'rounded-md'
                            ]">Add Job
                            </RouterLink>
                            <RouterLink v-if="user.current" to="/" :class="[isActiveLink('/logout')
                                ? 'bg-emerald-900'
                                : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3', 'py-2', 'rounded-md'
                            ]"><button @click="user.logout">Logout</button>
                            </RouterLink>
                            <RouterLink v-else to="/login" :class="[isActiveLink('/login')
                                ? 'bg-emerald-900'
                                : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3', 'py-2', 'rounded-md'
                            ]">Login
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

</template>