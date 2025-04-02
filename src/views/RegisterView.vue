<script setup>
import { user } from '@/lib/stores/user';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const fullName = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const role = ref("developer")

const companyName = ref("")
const selectedCompany = ref(null)
const companyExists = ref(false)
const companyDescription = ref("")
const companyEmail = ref("")
const companyPhone = ref("")

const errorMessage = ref("")
const companyErrorMessage = ref("")
const isCompanyRegistered = ref(false)
const isLoading = ref(false)

const toast = useToast()
const router = useRouter()

const mockCompanies = ["Company A", "Company B", "Company C"]

watch(role, (newType) => {
    if (newType === "developer") {
        selectedCompany.value = null
        companyExists.value = false
        isCompanyRegistered.value = false
    }
})

const checkCompanyExists = async () => {
    isLoading.value = true;
    setTimeout(() => {
        if (mockCompanies.includes(companyName.value)) {
            companyExists.value = true
            companyErrorMessage.value = ""
        } else {
            companyExists.value = false
            companyErrorMessage.value = "Company not found. Would you like to register a new company?"
        }
        isLoading.value = false;
    }, 1000);
};

const registerNewCompany = () => {
    isCompanyRegistered.value = true;
    companyExists.value = true;
    companyErrorMessage.value = '';
};

const validateForm = () => {
    errorMessage.value = ""
    if (!fullName.value.trim()) {
        errorMessage.value = "Full Name is required.";
    } else if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorMessage.value = "Invalid email format.";
    } else if (password.value.length < 6) {
        errorMessage.value = "Password must be at least 6 characters long.";
    } else if (password.value !== confirmPassword.value) {
        errorMessage.value = "Passwords do not match.";
    } else if (role.value === 'recruiter' && !companyName.value.trim()) {
        errorMessage.value = "Company Name is required for recruiters.";
    }
    return !errorMessage.value;
}

const handleSubmit = () => {
    if (validateForm()) {
        user.register(email.value, password.value, fullName.value, role.value)
    } else {
        toast.error(errorMessage.value)
    }
}
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
                        <label for="role" class="block text-gray-700 font-bold mb-2">Role</label>
                        <select v-model="role" id="role" name="role" class="border rounded w-full py-2 px-3"
                            required>
                            <option value="developer">Developer</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>


                    <!-- Recruiter-specific fields -->
                    <div v-if="role === 'recruiter'" class="mb-4">
                        <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
                        <input v-model="companyName" type="text" name="company" id="company" placeholder="Company"
                            class="border rounded w-full py-2 px-3 mb-2" required>
                        <p v-if="isLoading" class="text-gray-500 text-sm">Checking company...</p>
                        <p v-if="companyErrorMessage" class="text-red-500 text-sm">{{ companyErrorMessage }}</p>
                        <div v-if="companyExists">
                            <p class=" text-emerald-500 text-sm">{{ companyName }} found</p>
                        </div>
                        <div v-if="!companyExists && !isLoading">
                            <button @click="checkCompanyExists" type="button"
                                class="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">Fetch Company</button>
                            <button @click="registerNewCompany" type="button"
                                class="bg-emerald-500 text-white py-2 px-4 rounded-md">Register New Company</button>
                        </div>
                    </div>

                    <!-- Additional fields for new company registration -->
                    <div v-if="role === 'recruiter' && isCompanyRegistered" class="mb-4">
                        <label for="companyDescription" class="block text-gray-700 font-bold mb-2">Company
                            Description</label>
                        <textarea v-model="companyDescription" id="companyDescription"
                            placeholder="Describe your company" class="border rounded w-full py-2 px-3 mb-2"></textarea>
                        <label for="companyEmail" class="block text-gray-700 font-bold mb-2">Company Email</label>
                        <input v-model="companyEmail" type="email" id="companyEmail" placeholder="Company Email"
                            class="border rounded w-full py-2 px-3 mb-2" required>
                        <label for="companyPhone" class="block text-gray-700 font-bold mb-2">Company Phone</label>
                        <input v-model="companyPhone" type="text" id="companyPhone" placeholder="Company Phone"
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
                            placeholder="ConfirmPassword" class="border rounded w-full py-2 px-3 mb-2" required>
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
