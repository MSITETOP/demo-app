
<script setup>
    import Plus20Icon from '@bitrix24/b24icons-vue/actions/Plus20Icon';
    import CrossCircle70Icon from '@bitrix24/b24icons-vue/actions/CrossCircle70Icon';
    import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon';

    const store = useGlobalState();
    const { $BX24 } = useNuxtApp();
    const isShowError = ref(false);
    const autoResultSeconds = ref(5)
    

    const props = defineProps({
        items: {
            type: Object,
            required: false,
            default: () => Object()
        },
    });
    const isClient = ref(false);
    onMounted(() => {
        isClient.value = true;
    });
    
    const authCoze = (key) => {
        // console.log(key);
        store.updateAsistentsAndBots(key,{active:true});
        const url = store.cozeUrl+store.memberId;
        window.open(url, "_blank");
    };

    const aiHandler = async (key) => {
        const item = props.items[key];
        if (item.click) {
            const funcName = item.click;
            if (funcName === 'authCoze') {
                authCoze(key);
            }
        } else {
            
            const {active:isActive,context,title,type} = item;
            const params = {};
            let method = '';
            let active = true;
            store.updateAsistentsAndBots(key,{load:true});
            if(isActive) {
                active = false;
                if(key.startsWith("ipg")){
                    method = 'ai.engine.unregister';
                    params.code = key;
                } else {
                    method = 'imbot.unregister';
                    params.BOT_ID = store.getBotIdByCode(key);
                }
               
            } else {
                if(key.startsWith("ipg")) {
                    method = 'ai.engine.register';
                    params.name = 'Геннадий ПеТрович ( '+title+' )';
                    params.code = key;
                    params.category = 'text';
                    params.completions_url = 'https://'+window.location.host+'/message?bot='+key;
                    params.settings = {
                        code_alias: 'ChatGPT',
                        model_context_type: 'token',
                        model_context_limit: (context)?context:16*1024,
                    };
                } else {
                    method = 'imbot.register';
                    params.CODE = key;
                    params.TYPE = type;
                    params.EVENT_HANDLER = 'https://'+window.location.host+'/botmsg';
                    params.PROPERTIES = {
                        NAME: `Геннадий ПеТрович ( ${title} )`
                    };
                }
            }

            try {
                const query = await $BX24.callMethod(method, params);
                if (query.isSuccess) {
                    console.log(query.getData());
                } else {
                    console.error(query.errors);
                }
            } catch(e) {
                isShowError.value = true;
                console.error(e);
                active = !active;
            }
            store.updateAsistentsAndBots(key,{load:false,active});
            console.log(method, params);
            // console.log('activeToggle',$BX24);
        }
    };

    const resetState = () => {
        isShowError.value = false
    };

</script>

<template>
    <B24Alert
        v-if="isShowError"
        :icon="CrossCircle70Icon"
        description="Ошибка"
        size="sm"
        color="danger"
        class="fixed top-3 left-3 w-auto"
    >
    <template #description>
      <div class="flex flex-row items-center justify-between gap-2">
        <div>Ошибка</div>
        <div class="shrink-0 relative size-6 group">
          <B24Countdown
            as="div"
            class="size-full absolute inset-x-0 inset-y-0 z-30 group-hover:z-10 group-hover:opacity-40"
            :seconds="autoResultSeconds"
            use-circle
            size="sm"
            @end="resetState"
            @click="resetState"
          />
          <Cross30Icon
            class="cursor-pointer size-full opacity-0 group-hover:opacity-100 text-base-500 dark:text-base-600 group-hover:text-base-900 dark:group-hover:text-base-900 absolute inset-x-0 inset-y-0 z-20"
            @click="resetState"
          />
        </div>
      </div>
    </template>
  </B24Alert>
    <div v-if="isClient && items && typeof(items) === 'object' && JSON.stringify(items) !== '{}'">
        <ul class="list">
            <li v-for="(item,key) in items" :key="key" class="flex justify-between gap-row-24 items-top border-top">
                <div class="pr-3">
                    <div class="text-2xl-cust font-normal">{{ item.title }}</div>
                    <div v-if="item.description" class="text-base-600 text-lg mt-4">{{ item.description }}</div>
                </div>
                <div class="price-and-btn">
                    <div class="flex gap-3">
                        <div class="whitespace-nowrap">
                            <span class="font-semibold text-2xl-cust">{{ item.price || 'По запросу' }}</span>
                            <span v-if="item.formPayment" class="font-normal text-lg text-base-600"> / {{ item.formPayment }}</span>
                        </div>
                        <template v-if="item.click && item.click === 'formShow'">
                            <B24Slideover title=" " description=" " :side="store.modeView === 'mobile' ? 'top' : 'right'">
                                <B24Button
                                    color="primary"
                                    class="text-xs font-regular text-white p-0 w-cust-btn justify-center"
                                    :label="item.btnText"
                                />
                                <template #content>
                                    <SliderForm/>
                                </template>
                            </B24Slideover>
                        </template>
                        <template v-else-if="item.click && item.click === 'authCoze'">
                            <template v-if="item.active">
                                <div class="flex gap-2 no-column w-cust-btn">
                                    <B24Button
                                        color="primary"
                                        class="text-xs font-regular active-color p-0 justify-center grow"
                                        :loading="!!item.load"
                                        label="Подключено"
                                        disabled
                                        @click="() => aiHandler(key)"
                                    />
                                    <B24Slideover title=" " description=" " :side="store.modeView === 'mobile' ? 'top' : 'right'">
                                        <B24Button
                                            :icon="Plus20Icon"
                                            color="primary"
                                            class="text-xs font-regular text-white p-0 justify-center"
                                        />
                                        <template #body>
                                            <AddCozeBotForm/>
                                        </template>
                                    </B24Slideover>
                                </div>
                            </template>
                            <template v-else>
                                <B24Button
                                    color="primary"
                                    active-class="active-color"
                                    class="text-xs font-regular text-white p-0 w-cust-btn justify-center"
                                    :active="item.active"
                                    :loading="!!item.load"
                                    :label="item.btnText"
                                    @click="() => aiHandler(key)"
                                />
                            </template>
                        </template>
                        <template v-else>
                            <B24Button
                                color="primary"
                                active-class="active-color"
                                class="text-xs font-regular text-white p-0 w-cust-btn justify-center"
                                :active="item.active"
                                :loading="!!item.load"
                                :label="item.btnText ? item.btnText : item.active ? 'Деактивировать' : 'Активировать'"
                                @click="() => aiHandler(key)"
                            />
                        </template>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <template v-else>
        <div v-if="store.modeView !== 'preloader'">
            <ul>
                <li class="text-center">Пусто</li>
            </ul>
        </div>
    </template>
</template>

<style>
    .w-cust-btn {
        width: 155px;
    }
    .gap-row-24 {
        row-gap: 24px;
    }
    .list .border-top {
        padding: 24px 24px 0 24px;
    }
    .list .active-color {
        color: #3C3C3E;
        background-color: #DFE0E3;
        border: 0 solid transparent;
    }
    .list .active-color:hover {
        background-color: #CFD4D8;
    }
    .list .border-top:first-child {
        padding-top: 0;
    }
    .list .border-top:not(:first-child) {
        margin-top: 24px;
        border-top: 1px solid #E8E8E8;
    }
    .text-2xl-cust {
        font-size: 20px;
    }
    @media (max-width: 1024px) {
        .list .flex.gap-row-24 {
            flex-wrap: wrap;
        }
        .list .flex.gap-row-24 > .pr-3{
            padding: 0;
        }
    }
    @media (max-width: 768px) {
        .list .price-and-btn {
            width: 100%;
        }
        .list .price-and-btn .flex:not(.no-column) {
            flex-direction: column;
        }
        .list .border-top {
            padding: 24px 16px 0 16px;
        }
        .w-cust-btn {
            width: 100%;
        }
    }
</style>