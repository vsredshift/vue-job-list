<script setup>
import { ref, defineProps, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { jobs } from "@/lib/stores/jobs";
import PulseLoader from "vue-spinner/src/PulseLoader.vue"
import JobListing from "./JobListing.vue";

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false,
    }
})

const isLoading = ref(true)

onMounted(async () => {
    try {
        await jobs.init()
    } catch (error) {
        console.error("Failed to get jobs", error)
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold  text-emerald-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <div v-if="isLoading" class="text-center text-gray-500 py-6"><PulseLoader /></div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing v-for="job in jobs.current.slice(0, limit || jobs.current.length)" :key="job.id" :job=job />
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View
            All Jobs</RouterLink>
    </section>

</template>