<script setup>
    // import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
    
    const { $BX24 } = useNuxtApp();
    const store = useGlobalState();
    const props = defineProps({
        items: {
            type: Array,
            required: true,
        },
        headerItems: {
            type: Array,
            required: true,
        },
    });

    onMounted(() => {
        const showItemsPage  = +localStorage.getItem('show_items_page') || 10;
        store.setTotalPages( Math.ceil(props.items.length / showItemsPage));
        store.setShowItemsPage(showItemsPage);
        const start = store.getStartSlice;
        const end = start + store.showItemsPage;
        store.setShowItems(props.items.slice(start, end));
    });
    
    const formatDate = (timestamp) => {
        const months = '|января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря'.split('|');
        const date = new Date(timestamp/1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = +String(date.getMonth() + 1).padStart(2);
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day} ${months[month]} ${year}, ${hours}:${minutes}`;
    };

    const openSlider = (userId) => {
        if (userId > 0)
            $BX24.slider.openPath($BX24.slider.getUrl(`/company/personal/user/${userId}/`),1086);
    };

</script>

<template>
    <div v-if="store.showItems.length">
        <template v-if="headerItems.length && store.modeView === 'decktop'">
            <table class="w-full">
                <thead>
                    <tr class="row-style">
                        <th v-for="(text,index) in headerItems" :key="index" class="text-start font-semibold text-lg text-color-table"><span >{{ text }}</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(arItem,i) in store.showItems" :key="i" :class="['row-style border-top', (i+1)%2===0?'gb-grey':'']">
                        <td class="font-normal text-lg text-color-table">{{ formatDate(arItem.timestamp) }}</td>
                        <td :class="['font-normal text-lg',arItem.cost > 0 ? 'text-green-cust' : 'text-red-600']">{{ arItem.cost > 0 ? '+'+arItem.cost : arItem.cost }}</td>
                        <td class="font-normal text-lg text-color-table">
                            <B24Badge
                                size="xl"
                                :label="arItem.name"
                                :use-fill="false"
                                :b24ui="{wrapper: 'gap-10px'}"
                                class="ring-0 font-normal text-lg text-color-table cursor-pointer"
                                :avatar="{ src: arItem.src }"
                                @click="() => openSlider(arItem.user_id)"
                                />
                        </td>
                        <td class="font-normal text-lg text-color-table"><span v-if="arItem.description">{{ arItem.description }}</span></td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template v-else>
            <ul class="transactions-mobile">
                <li v-for="(arItem,i) in store.showItems" :key="i">
                    <div class="flex items-center justify-between">
                        <div class="font-normal text-lg">{{ formatDate(arItem.timestamp) }}</div>
                        <div :class="['font-normal text-lg',arItem.cost > 0 ? 'text-green-cust' : 'text-red-600']">{{ arItem.cost > 0 ? '+'+arItem.cost : arItem.cost }}</div>
                    </div>
                    <div class="font-normal text-lg text-base-600 mt-1"><span v-if="arItem.description">{{ arItem.description }}</span></div>
                    <div class="mt-2">
                        <B24Badge
                            size="xl"
                            :label="arItem.name"
                            :use-fill="false"
                            :b24ui="{wrapper: 'gap-10px'}"
                            class="ring-0 font-normal text-lg text-color-table babge-bg cursor-pointer"
                            :avatar="{ src: arItem.src }"
                            @click="() => openSlider(arItem.user_id)"
                        />
                    </div>
                </li>
            </ul>
        </template>
        <FooterPagen :total="items.length" :all-items="items"/>
    </div>
    <div v-else>
        <PreloaderMain/>
    </div>
</template>

<style>
    table .gb-grey {
        background-color: #F4F7F8;
    }
    table .gap-10px,
    .transactions-mobile .gap-10px {
        gap: 10px;
    }

    .transactions-mobile .babge-bg {
        background-color: #3BC8F54D;
    }
    .table border-top {
        border-top: 1px solid #E8E8E8;
    }
    table .row-style th,
    table .row-style td {
        padding-top: 15px;
        padding-bottom: 17px;
    }
    table .row-style th:first-child,
    table .row-style td:first-child {
        padding-left: 30px;
    }
    table .row-style th:last-child,
    table .row-style td:last-child {
        padding-right: 30px;
    }
    .text-green-cust {
        color: #29AD49;
    }
    .text-color-table {
        color: #535C69;
    }
    .transactions-mobile li {
        padding: 0 0 24px;
        border-bottom: 1px solid #E8E8E8;
    }
    .transactions-mobile li:not(:first-child) {
        margin-top: 24px;
    }
    
    @media (max-width: 768px) {
        .transactions-mobile li {
            padding: 0 16px 24px;
        }
    }
</style>