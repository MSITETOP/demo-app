<script setup>
    import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon';
    import SuccessIcon from '@bitrix24/b24icons-vue/button/SuccessIcon';

    const store = useGlobalState();
    const errors = ref({});
    const isShowResult = ref(false);
    const resMessage = ref({});
    const autoResultSeconds = ref(3);
    const state = ref({
        bot_id: '',
        bot_type: '',
    });

    const items = [
        { label: 'AI Ассистент', value: 'A' },
        { label: 'Чат-бот для компании', value: 'B' },
        { label: 'Чат-бот для открытых линий', value: 'C' }
    ];

    const validateForm = (e) => {
        if (!e || e && e.type === 'keyup') {
            if (!state.value.bot_id) {
                errors.value.bot_id = 'ID бота обязателен для заполнения';
            } else {
                delete errors.value.bot_id;
            }
        }
        
        if (!e || e && e.type === 'change') {
            if (!state.value.bot_type) {
                errors.value.bot_type = 'Тип бота обязателен для выбора';
            } else if (!['A', 'B', 'C'].includes(state.value.bot_type)) {
                errors.value.bot_type = 'Выберите корректный тип бота';
            } else {   
                delete errors.value.bot_type;
            }
        }
    };

    const onSubmit = async () => {
        validateForm();
        if (Object.keys(errors.value).length > 0)  return;
        addBot();
    }
    
    const addBot = () => {

        const body = JSON.stringify({
            bot_id: state.value.bot_id,
            bot_type: state.value.bot_type,
            member_id: store.memberId
        });
        fetch('/cozebot-add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body, 
        })
        .then(response => response.json())
        .then(data => {
            console.log('Ответ:', data);
            if(data.name){
                resMessage.value = {
                    msg: `Бот ${data.name} добавлен, можно его активировать`,
                    status: 'success'
                };
            } else {
                resMessage.value = {
                    msg: `Ошибка добавления бота:  ${data.message}`,
                    status: 'danger'
                };
            }
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        }).finally(() => isShowResult.value = true);
    };

    const resetState = () => {
        state.value.bot_id = '';
        state.value.bot_type = '';
        isShowResult.value = false;
        resMessage.value = {};
    };
</script>

<template>
    <div class="pl-3 pr-3 pb-3">
        <B24Alert
            v-if="isShowResult"
            :icon="SuccessIcon"
            :description="resMessage.msg"
            size="sm"
            :color="resMessage.status"
        >
            <template #description>
                <div class="flex flex-row items-center justify-between gap-2">
                    <div>{{resMessage.msg}}</div>
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
        <B24Form 
            v-else
            :state="state"
            class="space-y-6"
            @submit="onSubmit"
        >
            <B24FormField label="ИД бота:" name="bot_id">
                <B24Input v-model="state.bot_id" class="w-full" @keyup="validateForm"/>
                <div v-if="errors.bot_id" class="text-red-500 text-sm mt-1">{{ errors.bot_id }}</div>
            </B24FormField>
      
            <B24FormField label="Тип бота:" name="bot_type">
                <B24Select v-model="state.bot_type" :items="items" class="w-full" @change="validateForm"/>
                <div v-if="errors.bot_type" class="text-red-500 text-sm mt-1">{{ errors.bot_type }}</div>
            </B24FormField>
      
            <B24Separator class="mt-6 mb-3" />
            <div class="flex flex-row gap-4 items-center justify-between">
                <div class="flex gap-2">
                    <B24Button type="submit" label="Добавить" color="primary" />
                </div>
            </div>
        </B24Form>
    </div>
</template>