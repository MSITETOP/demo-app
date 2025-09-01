<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Deployment Debug Info</h1>
    <div class="bg-gray-100 p-4 rounded">
      <p><strong>App Name:</strong> {{ appName }}</p>
      <p><strong>Build Time:</strong> {{ buildTime }}</p>
      <p><strong>Base URL:</strong> {{ baseURL }}</p>
      <p><strong>Environment:</strong> {{ environment }}</p>
    </div>
    <div class="mt-4">
      <NuxtLink to="/" class="text-blue-500 hover:underline">← Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const appName = 'ipg.roborest'
const buildTime = new Date().toISOString()
const { $config } = useNuxtApp()
const baseURL = $config?.app?.baseURL || '/'
const environment = process.env.NODE_ENV || 'development'
</script>