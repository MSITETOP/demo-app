<script setup>
    import logo from '~/assets/logo.svg';
    import RecordVideoIcon from '@bitrix24/b24icons-vue/main/RecordVideoIcon';
    import ClockWithArrowIcon from '@bitrix24/b24icons-vue/main/ClockWithArrowIcon';
    import { useGlobalState } from '~/stores/globalState';
    import { computed } from 'vue';
    const store = useGlobalState();
</script>

<template>
    <header class="bg-white pt-4 pb-4 pl-6 pr-6">
        <div class="flex justify-between">
            <div class="flex gap-4 items-center">
                <NuxtLink to="/">
                    <div class="flex gap-4 items-center f-size-10">
                        <img :src="logo" alt="Петрович">
                        <div>
                            <div class="font-semibold text-h3">
                                <span>Геннадий <span class="blue-530">ПеТрович</span></span>
                            </div>
                            <div class="text-base-600 text-xs">
                                <span>что то новенькое</span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
                <nav>
                    <ul class="flex space-x-6 font-semibold text-lg">
                        <li class=""><NuxtLink to="/" class="asistents-and-bots" active-class="border-bottom">AI-Ассистенты</NuxtLink></li>
                        <li class=""><NuxtLink to="/chatbots" class="asistents-and-bots" active-class="border-bottom">Чат-боты</NuxtLink></li>
                    </ul>
                </nav>
            </div>
            <div class="flex flex-wrap gap-4 items-center justify-between">
                <ul class="flex gap-4 space-x-4">
                    <li class="flex items-center mr-0">
                        <B24Button
                            to="/history"
                            :icon="ClockWithArrowIcon"
                            color="link"
                            link="normal"
                            active-class="blue-530"
                            class="normal-case text-lg font-regular right-border text-base-600"
                            label="История транзакций"
                        />
                        <B24Button
                            to="https://vkvideo.ru/playlist/-24162245_45684532"
                            :icon="RecordVideoIcon"
                            color="link"
                            target="_blank"
                            class="normal-case text-lg font-regular text-base-600"
                            label="Инструкция"
                        />
                    </li>
                    <li class="flex gap-16-cust bg-support text-lg rounded-sm pt-3 pb-3 pr-6 pl-6">
                        <div>
                            <div class="text-base-600">Тех. поддержка</div>
                            <NuxtLink to="mailto:ka@ipgpromo.ru" class="blue-530">ka@ipgpromo.ru</NuxtLink>
                        </div>
                        <div>
                            <SupportWidget :mobile-view="false"/>
                        </div>
                    </li>
                </ul>
                <div class="flex gap-5 items-center">
                    <TopUpBtn/>
                </div>
            </div>
        </div>
    </header>
</template>

<style>
    .gap-16-cust {
        column-gap: 16px;
    }
    .gap-40-cust {
        column-gap: 40px;
    }
    .text-h3 {
        font-size: 20px;
    }
    .blue-530 {
        color: #3BC8F5;
    }
    
    .asistents-and-bots {
        display: block;
        border-bottom: 4px solid transparent;
        padding: 8px 0;
    }
    .border-bottom {
        border-bottom-color:#3BC8F5;
    }
    .right-border {
        border-right: 1px solid #E8E8E8;
    }
    .bg-support {
        background-color: #3BC8F512;
    }
    @media(max-width: 1390px) {
        header .flex.flex-wrap {
            justify-content: center;
        }
        .gap-40-cust {
            row-gap: 10px;
        }
    }
</style>