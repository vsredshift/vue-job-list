<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { jobs } from '@/lib/stores/jobs';
import { companies } from '@/lib/stores/companies';

const route = useRoute();
const router = useRouter();
const jobId = route.params.id

const form = reactive({
    type: "Full-Time",
    title: "",
    description: "",
    salary: "$70K - $80K",
    location: "",
    company: ""
})

const state = reactive({
    job: {},
    isLoading: false
})

const toast = useToast();

const handleSubmit = async () => {
    const updatedJob = {
        type: form.type,
        title: form.title,
        description: form.description,
        salary: form.salary,
        location: form.location,
    }

    try {
        const response = await jobs.update(jobId, updatedJob)
        toast.success("Job updated successfully")
        router.push(`/jobs/${response}`)
    } catch (error) {
        console.error("Error updating job listing", error)
        toast.error("Something went wrong updating job")
    }
}

onMounted(async () => {
    try {
        state.job = await jobs.findOne(jobId);
        let company = await companies.findOne(state.job.company)
        form.type = state.job.type
        form.title = state.job.title
        form.description = state.job.description
        form.salary = state.job.salary
        form.location = state.job.location
        form.company = company.name
    } catch (error) {
        console.error("Error getting job", error)
    } finally {
        state.isLoading = false
    }
})
</script>

<template>
    <section class="bg-emerald-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Update Job</h2>

                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Job Type</label>
                        <select v-model="form.type" id="type" name="type" class="border rounded w-full py-2 px-3"
                            required>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                        <input v-model="form.title" type="text" id="name" name="name"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami"
                            required />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea v-model="form.description" id="description" name="description"
                            class="border rounded w-full py-2 px-3" rows="4"
                            placeholder="Add any job duties, expectations, requirements, etc"></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Salary</label>
                        <select v-model="form.salary" id="salary" name="salary" class="border rounded w-full py-2 px-3"
                            required>
                            <option value="Under $50K">under $50K</option>
                            <option value="$50K - $60K">$50 - $60K</option>
                            <option value="$60K - $70K">$60 - $70K</option>
                            <option value="$70K - $80K">$70 - $80K</option>
                            <option value="$80K - $90K">$80 - $90K</option>
                            <option value="$90K - $100K">$90 - $100K</option>
                            <option value="$100K - $125K">$100 - $125K</option>
                            <option value="$125K - $150K">$125 - $150K</option>
                            <option value="$150K - $175K">$150 - $175K</option>
                            <option value="$175K - $200K">$175 - $200K</option>
                            <option value="Over $200K">Over $200K</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">
                            Location
                        </label>
                        <input v-model="form.location" type="text" id="location" name="location"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Company Location" required />
                    </div>

                    <div class="mb-4">
                        <label for="company" class="block text-gray-700 font-bold mb-2">Company</label>
                        <input v-model="form.company" id="company" name="company"
                            class="border rounded w-full py-2 px-3" required disabled />
                    </div>

                    <div>
                        <button
                            class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Update Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

</template>