<script setup>
import { companies } from '@/lib/stores/companies';
import { jobs } from '@/lib/stores/jobs';
import { user } from '@/lib/stores/user';
import router from '@/router';
import { onMounted, reactive } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const form = reactive({
    type: "Full-Time",
    title: "",
    description: "",
    salary: "$70K - $80K",
    location: "",
    company: ""
})

const userCompanies = reactive([])

const fetchUserCompanies = async () => {
    if (!user.current) return;
    
    try {
        await companies.init()
        if (user.current?.prefs.role === "admin") {
            userCompanies.splice(0, userCompanies.length, ...companies.current)
        }
        else if (user.current?.prefs.role === "employer") {
            const companyIds = user.current?.prefs.company ? user.current?.prefs.company.split(',') : [];
            const documents = companies.current.filter(doc => companyIds.includes(doc.$id))
            userCompanies.splice(0, userCompanies.length, ...documents)
        }
    } catch (error) {
        console.error("Error getting companies", error)
    }

}
const handleSubmit = async () => {
    const newJob = {
        type: form.type,
        title: form.title,
        description: form.description,
        salary: form.salary,
        location: form.location,
        company: form.company,
    }

    try {
        const response = await jobs.add(newJob)
        toast.success("Job added successfully")
        router.push(`/jobs/${response}`)
    } catch (error) {
        console.error("Error adding job listing", error)
        toast.error("Something went wrong adding job")
    }
}

onMounted(fetchUserCompanies)
</script>

<template>
    <section class="bg-emerald-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

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
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Full-stack Vue Developer"
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
                        <select v-model="form.company" id="company" name="company"
                            class="border rounded w-full py-2 px-3" required>
                            <option v-for="company in userCompanies" :key="company.$id" :value="company.$id">
                                {{ company.name }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <button
                            class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Add Job
                        </button>
                    </div>
                </form>
                <p class="mt-3">
                    Want to post a job with a different company?
                    <RouterLink to="/register" class="text-blue-500">
                        Register a new company
                    </RouterLink>
                </p>
            </div>
        </div>
    </section>
</template>