<script setup>
    const store = useGlobalState();

    const props = defineProps({
        total: {
            type: Number,
            required: true,
        },
        allItems: {
            type: Array,
            required: true,
        },
    });
    const items = ref([10,20,50,100]);

    const handleSelect = () => {
        store.setShowItemsPage(store.showItemsPage);
        store.setTotalPages( Math.ceil(props.total / store.showItemsPage));
        let start = store.getStartSlice;
        let end = start + store.showItemsPage;
        if (start >= props.total) {
            store.setCurrentPage(store.totalPages);
            start = store.getStartSlice;
            end = start + store.showItemsPage;
        }
        store.setShowItems(props.allItems.slice(start, end));
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= store.totalPages) {
            store.setCurrentPage(page);
            const start = store.getStartSlice;
            const end = start + store.showItemsPage;
            store.setShowItems(props.allItems.slice(start, end));
        }
    };

    const showMore = () => {
        const start = store.showItems.length;
        const end = start + 10;
        store.setShowItems([...store.showItems,...props.allItems.slice(start, end)]);
    };

    
</script>

<template>
    <div v-if="total > store.showItemsPage && total > store.showItems.length " :class="['pagen-block flex justify-center pt-3 pb-3', (store.modeView === 'decktop' ? 'border-t-2 border-b-2 border-E8E8E8' : '') ]">
        <B24Button
            class="border-base-330 border-2 font-semibold text-sm text-blue-530 pl-10 pr-10 bg-hover"
            color="link"
            :rounded="true"
            :normal-case="true"
            label="Показать ещё"
            @click="showMore"
        />
    </div>
    <div v-if="store.modeView === 'decktop'" class="flex items-center justify-between mt-3">
        <div>
            <span class="uppercase font-semibold text-3xs">Всего: {{ total }} </span>
        </div>
        <div class="pages-items-wrap">
            <span class="uppercase font-semibold text-3xs">Страницы: {{ store.currentPage }} </span>
            <B24Button
                v-if="store.currentPage > 2"
                class="font-semibold text-3xs text-blue-530 rounded-none"
                color="link"
                label="Первая"
                @click="goToPage(1)"
            />
            <B24Button
                v-if="store.currentPage > 1"
                class="font-semibold text-3xs text-blue-530 rounded-none"
                color="link"
                label="Пред."
                @click="goToPage((store.currentPage-1))"
            />
            <B24Button
                v-if="store.currentPage < store.totalPages"
                class="font-semibold text-3xs text-blue-530 rounded-none"
                color="link"
                label="След."
                @click="goToPage((store.currentPage+1))"
            />
            <B24Button
                v-if="store.currentPage < (store.totalPages-2)"
                class="font-semibold text-3xs text-blue-530 rounded-none"
                color="link"
                label="Последняя"
                @click="goToPage(store.totalPages)"
            />
        </div>
        <div class="flex items-center gap-2">
            <span class="uppercase font-semibold text-3xs text-nowrap">На странице:</span>
            <B24Select
                v-model="store.showItemsPage"
                size="md"
                :items="items"
                class="w-auto font-semibold text-3xs"
                :b24ui="{itemLabel: 'not'}"
                @change="handleSelect"
            /> 
        </div>
    </div>
</template>

<style>
    .pagen-block.border-E8E8E8 {
        border-color: #E8E8E8;
    }
    .pagen-block .bg-hover:hover {
        background-color: #F4F7F8;
        color: #3bc8f5;
    }

    .truncate.not {
        overflow: visible;
    }

    .pages-items-wrap *:not(:last-child) {
        border-right: 1px solid #E8E8E8;
        padding-right: 4.5px;
        margin-right: 4.5px;
        height: fit-content;
    }
</style>