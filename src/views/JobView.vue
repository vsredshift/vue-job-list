<script setup>
import { onMounted, ref, computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { useToast } from 'vue-toastification';
import { jobs } from '@/lib/stores/jobs';
import { companies } from '@/lib/stores/companies';
import { user } from '@/lib/stores/user';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const jobId = route.params.id;
const job = ref({})
const company = ref({})

const isLoading = ref(true)

const isAdmin = computed(() => user.current?.prefs.role === "admin");
const isPoster = computed(() => company.value.users.includes(user.current?.$id));

const deleteJob = async () => {
    try {
        const confirm = window.confirm("Are you sure you want to delete this job listing?")
        if (confirm) {
            await jobs.remove(jobId)
            toast.success("Job deleted")
            router.push(`/jobs/user/${user.current.$id}`)
        }
    }
    catch (error) {
        console.error("Error deleting job", error)
        toast.error("Something went wrong deleting job")
    }
}

const handleSaveJob = async (job) => {
    if (!user.current) {
        console.error("User not logged in");
        toast.error("You must be logged in to save a job listing")
        return;
    }
    const updatedSavedBy = job.savedBy ? [...new Set([...job.savedBy, user.current.$id])] : [user.current.$id];

    await jobs.update(jobId, { savedBy: updatedSavedBy });
    toast.success("Job saved")
    router.push(`/jobs/user/${user.current.$id}`)
};

const removeJobFromSaved = async (job) => {
    if (!job.savedBy || !job.savedBy.includes(user.current.$id)) {
        console.warn("Job is not saved by this user");
        return;
    }

    const updatedSavedBy = job.savedBy.filter(id => id !== user.current.$id);

    await jobs.update(job.$id, { savedBy: updatedSavedBy });
    toast.success("Job removed from saved");
    router.push(`/jobs/user/${user.current.$id}`)
}


onMounted(async () => {
    try {
        job.value = await jobs.findOne(jobId)
        company.value = await companies.findOne(job.value.company)
    } catch (error) {
        console.error("Error getting job", error)
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <BackButton />
    <section v-if="!isLoading" class="bg-emerald-50">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-500 mb-4">{{ job.type }}</div>
                        <h1 class="text-3xl font-bold mb-4">{{ job.title }}</h1>
                        <div class="text-amber-500 mb-4 flex align-middle justify-center md:justify-start">
                            <i class="pi pi-map-marker text-amber-700 mr-2"></i>
                            <p class=" text-amber-700">{{ job.location }}</p>
                        </div>
                    </div>                    

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class=" text-emerald-800 text-lg font-bold mb-6">
                            Job Description
                        </h3>

                        <p class="mb-4">
                            {{ job.description }}
                        </p>

                        <h3 class=" text-emerald-800 text-lg font-bold mb-2">Salary</h3>

                        <p class="mb-4">{{ job.salary }} / Year</p>
                    </div>
                </main>

                <!-- Sidebar -->
                <aside>
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>

                        <h2 class="text-2xl">{{ company.name }}</h2>

                        <p class="my-2">
                            {{ company.description }}
                        </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Contact Email:</h3>

                        <p class="my-2 bg-emerald-100 p-2 font-bold">
                            {{ company.contactEmail }}
                        </p>

                        <h3 class="text-xl">Contact Phone:</h3>

                        <p class="my-2 bg-emerald-100 p-2 font-bold">{{ company.contactPhone }}</p>
                    </div>

                    <!-- Manage -->
                    <div v-if="isAdmin || isPoster" class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <RouterLink :to="`/jobs/edit/${jobId}`"
                            class="bg-emerald-500 hover:bg-emerald-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Edit
                            Job</RouterLink>
                        <button @click="deleteJob"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Job
                        </button>
                    </div>
                    <div v-else-if="job.savedBy.includes(user.current?.$id)"
                        class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <button @click="removeJobFromSaved(job)"
                            class="bg-red-500 hover:bg-emerald-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Remove Job from List
                        </button>
                    </div>
                    <div v-else class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <button @click="handleSaveJob(job)"
                            class="bg-emerald-500 hover:bg-emerald-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Save Job
                        </button>

                    </div>
                </aside>
            </div>
        </div>
    </section>

    <div v-else class="text-center text-gray-500 py-6">
        <PulseLoader />
    </div>
</template>