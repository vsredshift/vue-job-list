<script setup>
import Hero from "@/components/Hero.vue"
import IndexCards from "@/components/IndexCards.vue"
import JobListings from "@/components/JobListings.vue"
</script>

<template>
    <Hero />
    <IndexCards />
    <JobListings limit="3" :showButton=true />
</template>