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
    const { $initializeB24Frame } = useNuxtApp();
    const balance = ref(null);
    const isLoading = ref(true);

    onMounted(async () => {
        try {
            const $b24 = await $initializeB24Frame();
            const {member_id} = $b24.auth.getAuthData();
            const response = await fetch('https://ai.app.ipgpromo.ru/app?member_id='+member_id);
            const data = await response.json();
            balance.value = data.options.token;
        } catch (error) {
            console.error('Error loading balance:', error);
        } finally {
            isLoading.value = false;
        }
    });
</script>

<template>
    <div>
        <div class="font-normal text-lg text-base-600">Баланс</div>
        <div class="font-semibold">
            <div v-if="!isLoading">{{balance}}</div>
            <div v-else>Загрузка...</div>
        </div>
    </div>
    <B24Slideover :b24ui="{ header: 'form-widget-header', body: 'form-widget-body' }" :side="store.modeView === 'mobile' ? 'top' : 'right'">
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

<style>
    .form-widget-header {
        margin-top: 0;
    }
    .form-widget-header .min-h-2xl {
        min-height: 0;
    }
    .form-widget-body {
        margin-top: 0;
    }
</style>