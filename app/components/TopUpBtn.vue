<script setup>
    import plus from '~/assets/plus.svg';

    defineProps({
        className: {
            type: Array,
            required: false,
            default: () => []
        },
    });
    const store = useGlobalState();
</script>

<template>
    <B24Slideover title=" " description=" " :side="store.modeView === 'mobile' ? 'top' : 'right'">
        <B24Button
            label="Пополнить"
            color="primary"
            :avatar="{ src: plus }"
            :class="className"
        />
    <template #body>
        <TopUpForm/>
    </template>
  </B24Slideover>
</template>