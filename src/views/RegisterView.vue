<script setup>
import { companies } from '@/lib/stores/companies';
import { user } from '@/lib/stores/user';
import { ref, watch, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

// User
const fullName = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const role = ref("developer")

// Company
const companyName = ref("")
const companyDescription = ref("")
const companyEmail = ref("")
const companyPhone = ref("")

const selectedCompany = ref(null)
const companyExists = ref(false)
const isNewCompany = ref(false)

// Message
const errorMessage = ref("")
const companyErrorMessage = ref("")
const isLoading = ref(false)
const toast = useToast()

const filteredCompanies = computed(() => {
    return companyName.value ? companies.current?.filter(c => c.name.toLowerCase().includes(companyName.value.toLowerCase())) : []
})

watch(role, (newType) => {
    if (newType === "developer") {
        selectedCompany.value = null
        companyExists.value = false
        isNewCompany.value = false
    }
})

watch(companyName, (newVal) => {
    if (!newVal.trim()) {
        companyErrorMessage.value = "";
        companyExists.value = false;
        selectedCompany.value = null;
        return;
    }

    if (selectedCompany.value && selectedCompany.value.name !== newVal) {
        selectedCompany.value = null;
        companyExists.value = false;
    }
    
    const match = companies.current.find(company => company.name.toLowerCase() === newVal.toLowerCase());

    if (match) {
        checkCompanyExists()
        companyExists.value = true;
        companyErrorMessage.value = "";
    } else {
        companyExists.value = false;
        companyErrorMessage.value = "Company not found. Would you like to register a new company?";
    }

})


const checkCompanyExists = () => {
    const company = companies.current.filter(company => company.name === companyName.value)
    if (company) {
        companyExists.value = true
        companyErrorMessage.value = ""
        isNewCompany.value = false
        selectedCompany.value = company[0].$id
    } else {
        companyExists.value = false
        selectedCompany.value = false
        companyErrorMessage.value = "Company not found. Would you like to register a new company?"
    }
    isLoading.value = false;
};

const validateForm = () => {
    errorMessage.value = ""
    if (!fullName.value.trim()) {
        errorMessage.value = "Full Name is required.";
        return;
    }
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorMessage.value = "Invalid email format.";
        return;
    }
    if (password.value.length < 6) {
        errorMessage.value = "Password must be at least 6 characters long.";
        return;
    }
    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Passwords do not match.";
        return;
    }
    if (role.value === 'employer') {
        if (!companyName.value.trim()) {
            errorMessage.value = "Company Name is required for employers.";
            return;
        }
        if (!isNewCompany.value && !companyExists.value) {
            errorMessage.value = "Company not found";
            companyErrorMessage.value = "Company not found. Would you like to register a new company?"
            return;
        }
        if (isNewCompany.value && companyExists.value) {
            errorMessage.value = "Company already exists";
            return;
        }
        if (isNewCompany.value && !companyDescription.value.trim()) {
            errorMessage.value = "Company description is required.";
            return;
        }
        if (isNewCompany.value && !companyEmail.value.trim()) {
            errorMessage.value = "Company email is required.";
            return;
        }
        if (isNewCompany.value && !companyPhone.value.trim()) {
            errorMessage.value = "Company phone is required.";
            return;
        }
    }
    return !errorMessage.value;
}

const handleSubmit = async () => {
    if (validateForm()) {
        try {
            // await user.register(email.value, password.value, fullName.value, role.value, companyName.value)
            console.log(email.value, password.value, fullName.value, role.value, selectedCompany.value, companyName.value)
            // if (role.value !== "developer") {
            //     console.log(user.current)
            //     await companies.add({ name: companyName.value, description: companyDescription.value, contactEmail: companyEmail.value, contactPhone: companyPhone.value, users: [user.current.$id] })
            // }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "An error occurred during registration.");
        }
    } else {
        toast.error(errorMessage.value)
    }
}

onMounted(async () => {
    await companies.init()
})
</script>

<template>
    <section class="bg-emerald-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Register</h2>
                    <div class="mb-4">
                        <label for="fullname" class="block text-gray-700 font-bold mb-2">Full Name</label>
                        <input v-model="fullName" type="text" name="fullname" id="fullname" placeholder="Full Name"
                            class="border rounded w-full py-2 px-3 mb-2" required>
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
                        <input v-model="email" type="email" name="email" id="email" placeholder="Email"
                            class="border rounded w-full py-2 px-3 mb-2" required>
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
                        <input v-model="password" type="password" name="password" id="password" placeholder="Password"
                            class="border rounded w-full py-2 px-3 mb-2" required>
                    </div>
                    <div class="mb-4">
                        <label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirm Password</label>
                        <input v-model="confirmPassword" type="password" name="confirmPassword" id="confirmPassword"
                            placeholder="Confirm Password" class="border rounded w-full py-2 px-3 mb-2" required>
                    </div>

                    <div class="mb-4">
                        <label for="role" class="block text-gray-700 font-bold mb-2">Role</label>
                        <select v-model="role" id="role" name="role" class="border rounded w-full py-2 px-3" required>
                            <option value="developer">Developer</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>


                    <!-- employer-specific fields -->
                    <div v-if="role === 'employer'" class="mb-4">
                        <div class="flex justify-between items-center">
                            <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
                            <button @click="isNewCompany = !isNewCompany" type="button"
                                class="bg-transparent font-semibold hover:text-white py-1 px-3 mb-2 border hover:border-transparent rounded"
                                :class="isNewCompany ? 'hover:bg-red-500 text-red-700 border-red-500' : 'hover:bg-emerald-500 text-emerald-700 border-emerald-500'">
                                {{ isNewCompany ? "Cancel" : "Register New Company" }}
                            </button>
                        </div>

                        <input v-model="companyName" type="text" name="company" id="company"
                            :placeholder="isNewCompany ? 'Enter Company Name' : 'Search for existing company'"
                            class="border rounded w-full py-2 px-3 mb-2" required>

                        <ul v-if="filteredCompanies.length && !selectedCompany && !isNewCompany" class="bg-white border rounded mt-2">
                            <li v-for="(company, index) in filteredCompanies" :key="index"
                                @click="companyName = company.name; checkCompanyExists()"
                                class="p-2 cursor-pointer hover:bg-gray-200">{{ company.name }}
                            </li>
                        </ul>
                        <p v-if="companyErrorMessage && !isNewCompany" class="text-red-500 text-sm">{{ companyErrorMessage }}</p>
                    </div>



                    <!-- Additional fields for new company registration -->
                    <div v-if="role === 'employer' && isNewCompany" class="mb-4">
                        <label for="companyDescription" class="block text-gray-700 font-bold mb-2">Company
                            Description</label>
                        <textarea v-model="companyDescription" id="companyDescription"
                            placeholder="Describe your company" class="border rounded w-full py-2 px-3 mb-2">
                        </textarea>

                        <label for="companyEmail" class="block text-gray-700 font-bold mb-2">Company Email</label>
                        <input v-model="companyEmail" type="email" id="companyEmail" placeholder="Company Email"
                            class="border rounded w-full py-2 px-3 mb-2" required>

                        <label for="companyPhone" class="block text-gray-700 font-bold mb-2">Company Phone</label>
                        <input v-model="companyPhone" type="text" id="companyPhone" placeholder="Company Phone"
                            class="border rounded w-full py-2 px-3 mb-2" required>
                    </div>

                    <div>
                        <button
                            class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Register
                        </button>
                    </div>
                </form>

                <p class="mt-3">
                    Already have an account?
                    <RouterLink to="/login" class="text-blue-500">
                        Login
                    </RouterLink>
                </p>
            </div>
        </div>
    </section>
</template>
