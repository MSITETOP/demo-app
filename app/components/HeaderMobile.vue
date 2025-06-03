<script setup>
    import logo from '~/assets/logo.svg';
    import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon';
    import RecordVideoIcon from '@bitrix24/b24icons-vue/main/RecordVideoIcon';
    import ChevronToTheRightIcon from '@bitrix24/b24icons-vue/actions/ChevronToTheRightIcon';
    import Cross45Icon from '@bitrix24/b24icons-vue/actions/Cross45Icon';
    import { useGlobalState } from '~/stores/globalState';
    import { computed } from 'vue';
    const store = useGlobalState();
    const balance = computed(() => store.balance);
    const linkToInstuction = computed(() => store.linkToInstuction);
    const isMenuOpen = ref(false);
    const menuId = 'b_menu_'+Math.floor(Math.random()*1000000);

    function openMenu() {
        isMenuOpen.value = true;
        nextTick(() => {
            const menu = document.getElementById(menuId);
            if (menu) setTimeout(() => {
                menu.classList.add('open');
            },1);
        });
    }
    function closeMenu() {
         const menu = document.getElementById(menuId);
        if (menu) menu.classList.remove('open');
        setTimeout(() => {
            isMenuOpen.value = false;
        },300);
    }
    
</script>

<template>
    <header class="bg-white p-14-16">
        <div class="flex items-center justify-between">
            <NuxtLink to="/">
                <div class="flex gap-4 items-center f-size-10">
                    <img :src="logo" alt="Петрович">
                    <div>
                        <div class="font-semibold text-h3">
                            <span>Геннадий <span class="blue-530">ПеТрович</span></span>
                        </div>
                        <div class="text-base-600 text-xs">
                            <span>AI-ассистент и чат-бот</span>
                        </div>
                    </div>
                </div>
            </NuxtLink>
            <div @click="openMenu">   
                <MenuIcon class="text-base-600 w-9 h-9" />
            </div>
        </div>
        <div v-if="isMenuOpen" :id="menuId" class="fixed-menu">
            <div class="absolute top-5 right-4" @click="closeMenu">
                <Cross45Icon class="text-base-600 w-8 h-8" />
            </div>
            <div class="">
                <div>
                    <div class="font-normal text-lg text-base-600">Баланс</div>
                    <div class="font-semibold">{{balance}}</div>
                </div>
                <TopUpBtn :class-name="['size-full','flex','justify-center', 'mt-4']"/>
            </div>
            <nav class="bg-white rounded-lg mt-6 nav-mobile">
                <ul class="font-semibold text-lg">
                    <li class="pl-6 pt-4-2 pr-6 pb-4-2" @click="closeMenu"><NuxtLink to="/" class="flex items-center justify-between font-regular" active-class="blue-530">AI-Ассистенты<span><ChevronToTheRightIcon class="text-base-600 w-4 h-4" /></span></NuxtLink></li>
                    <li class="pl-6 pt-4-2 pr-6 pb-4-2 bt-1-cust" @click="closeMenu"><NuxtLink to="/chatbots" class="flex items-center justify-between font-regular" active-class="blue-530">Чат-боты<span><ChevronToTheRightIcon class="text-base-600 w-4 h-4" /></span></NuxtLink></li>
                    <li class="pl-6 pt-4-2 pr-6 pb-4-2 bt-1-cust" @click="closeMenu"><NuxtLink to="/history" class="flex items-center justify-between font-regular" active-class="blue-530">История транзакций<span><ChevronToTheRightIcon class="text-base-600 w-4 h-4" /></span></NuxtLink></li>
                </ul>
            </nav>
            <div class="bg-white rounded-lg mt-6 pt-5 pb-5">
                <B24Button
                    :to="linkToInstuction"
                    :icon="RecordVideoIcon"
                    color="link"
                    target="_blank"
                    class="text-lg font-regular text-base-600 flex justify-center"
                    label="Инструкция"
                    @click="closeMenu"
                />
                
            </div>
            <div class="bg-white rounded-lg mt-6 pt-4 pl-6 pr-6 pb-6">
                <div class="text-lg font-semibold">Тех. поддержка:</div>
                <NuxtLink to="tel:88001002904" class="block mt-4">8 800 100 29 04</NuxtLink>
                <NuxtLink to="mailto:ka@ipgpromo.ru" class="blue-530 mt-1 block">ka@ipgpromo.ru</NuxtLink>
                <div class="mt-4">
                    <SupportWidget :mobile-view="true"/>
                </div>
            </div>
        </div>
    </header>
</template>

<style>
    .fixed-menu {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 24px;
        background-color: #F4F7F8;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        overflow-y: auto;
    }
    .fixed-menu.open {
        transform: translateX(0);
    }
    .nav-mobile .blue-530 svg {
        color: #3BC8F5;
    }
    .nav-mobile .pt-4-2 {
        padding-top: 18px;
    }
    .nav-mobile .pb-4-2 {
        padding-bottom: 18px;
    }
    .nav-mobile .bt-1-cust {
        border-top: 1px solid #E8E8E8;
    }
    .blue-530 {
        color: #3BC8F5;
    }
    .bg-grey {
        background-color: #F4F7F8;
        z-index: 1;
    }
    .p-14-16 {
        padding: 14px 16px;
    }
</style>