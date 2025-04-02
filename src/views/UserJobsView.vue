<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { jobs } from "@/lib/stores/jobs";
import { user } from "@/lib/stores/user";
import { Query } from "appwrite"
import JobListing from "@/components/JobListing.vue";
import BackButton from "@/components/BackButton.vue";

const savedJobs = ref([]);

const fetchSavedJobs = async () => {
    if (!user.current) return;

    try {
        const response = await jobs.getUserJobs([Query.contains("savedBy", user.current.$id)])
        savedJobs.value = response.documents;
    } catch (error) {
        console.error("Error fetching saved jobs:", error);
    }
};

onMounted(fetchSavedJobs);
</script>

<template>
    <BackButton />
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold  text-emerald-500 mb-6 text-center">
                My Jobs
            </h2>
            <div v-if="!savedJobs.length">
                <p class="text-xl mb-5">Your saved jobs will appear here</p>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing v-for="job in savedJobs" :key="job.id" :job=job />
            </div>
        </div>
    </section>
</template>
