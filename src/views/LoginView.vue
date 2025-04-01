<script setup>
import { ref } from 'vue';
import { user } from '@/lib/stores/user';

const email = ref("")
const password = ref("")

</script>

<template>
   <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="user.login(email, password)">
                    <h2 class="text-3xl text-center font-semibold mb-6">Login</h2>

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
                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>