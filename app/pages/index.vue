<script setup>
	import { useGlobalState } from '~/stores/globalState';
    import { computed } from 'vue';
    const store = useGlobalState();
    const asistents = computed(() => store.asistents);
    store.setTitle('AI-Ассистенты');
</script>

<template>
	<ItemList :items="asistents"/>
</template>
