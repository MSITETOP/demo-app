<script setup lang="ts">
  useHead({
    bodyAttrs: {
      class: 'text-base-master dark:text-base-150 bg-base-50 main-cust-bg-color font-b24-system antialiased',
    }
  });
</script>

<template>
  <B24App>
    <AppTemplate>
      <NuxtPage />
    </AppTemplate>
  </B24App>
</template>

<style>
  .main-cust-bg-color {
    background-color: #F4F7F8;
  }
</style>