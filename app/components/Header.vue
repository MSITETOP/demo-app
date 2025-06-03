
<script setup>
    const store = useGlobalState();
</script>

<template>
    <HeaderMobile v-if="store.modeView === 'mobile'"/>
    <HeaderDesc v-else-if="store.modeView === 'decktop'"/>
</template>


<script>
    export default {
        name: 'HeaderMain',
    };
</script>