<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue"
import Footer from "./components/Footer.vue";
import { onMounted, provide } from "vue";
import { user } from "./lib/stores/user";

onMounted(async () => {
  await user.init()
})

provide("user", user)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
