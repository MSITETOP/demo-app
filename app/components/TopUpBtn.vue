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
    <B24Slideover title="Пополнение баланса" description="Пополните баланс для использования всех возможностей сервиса" :side="store.modeView === 'mobile' ? 'top' : 'right'">
        <B24Button
            label="Пополнить"
            color="primary"
            :avatar="{ src: plus }"
            :class="className"
        />
    <template #content>
        <TopUpForm/>
    </template>
  </B24Slideover>
</template>