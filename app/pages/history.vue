
<script setup>
    import { useGlobalState } from '~/stores/globalState';
    const store = useGlobalState();
    const headerItems = ['Дата, время','Транзакция','Пользователь','Назначение'];
    store.setTitle('История транзакций');
</script>

<template>
    <TableItemListDesc :items="store.transHistory" :header-items="headerItems"/>
</template>