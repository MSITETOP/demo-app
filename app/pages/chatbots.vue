<script setup>
    import { useGlobalState } from '~/stores/globalState';
    import { computed } from 'vue';
    const store = useGlobalState();
    const bots = computed(() => store.bots);
    store.setTitle('Чат-боты');
</script>
<template>
	<ItemList :items="bots"/>
</template>