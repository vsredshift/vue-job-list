<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue"
import { onMounted, provide } from "vue";
import { user } from "./lib/stores/user";

onMounted(() => {
  user.init()
})

provide("user", user)
</script>

<template>
  <Navbar />
  <RouterView />
  </template>
