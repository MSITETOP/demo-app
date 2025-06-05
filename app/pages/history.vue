
<script setup>
    import { useGlobalState } from '~/stores/globalState';
    const store = useGlobalState();
    const headerItems = ['Дата, время','Транзакция','Пользователь','Назначение'];
    store.setTitle('История транзакций');

    const { $initializeB24Frame } = useNuxtApp();
    const tranzactions = ref(null);
    const isLoading = ref(true);

    onMounted(async () => {
        try {
            const $b24 = await $initializeB24Frame();
            const {member_id} = $b24.auth.getAuthData();
            const response = await fetch('https://ai.app.ipgpromo.ru/app?member_id='+member_id);
            const data = await response.json();
            const users = await $b24.callMethod('user.search',{'FILTER':{'USER_TYPE': 'employee', 'ACTIVE':true}});
            const usersData = users.getData().result;
			if (usersData.length) {
				data.tranzactions.map(transItem => {
					const {user_id} = transItem;
					const userData = usersData.filter(ar=>(+ar.ID) === (+user_id))[0] || {};
					let name = '';
					if (userData.NAME) name += userData.NAME;
					if (userData.LAST_NAME) name += ' '+userData.LAST_NAME;
					transItem.src = userData.PERSONAL_PHOTO || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0ic2l6ZS0yNCB0ZXh0LWJhc2UtbWFzdGVyIGRhcms6dGV4dC1iYXNlLTIwMCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS42NDUgMTEuNzEzYy0xLjA1NC0xLjY3IDcuODMyLTMuMDU3IDguNDIyIDIuMDU0YTE1LjYgMTUuNiAwIDAgMSAwIDQuNjQ3czEuMzI4LS4xNTIuNDQyIDIuMzcyYzAgMC0uNDg4IDEuODE2LTEuMjM4IDEuNDA4IDAgMCAuMTIyIDIuMjk2LTEuMDU4IDIuNjg1IDAgMCAuMDg0IDEuMjIzLjA4NCAxLjMwNmwuOTg2LjE0N3MtLjAzIDEuMDIuMTY3IDEuMTNjLjkuNTggMS44ODYgMS4wMjEgMi45MjMgMS4zMDUgMy4wNjIuNzc3IDQuNjE2IDIuMTEgNC42MTYgMy4yNzhsLjgyMyA0LjE4OWMtMy41NDQgMS40ODUtNy42NTcgMi4zNzMtMTIuMDU1IDIuNDY2SDI0LjIyYy00LjM4OS0uMDkzLTguNDkzLS45NzctMTIuMDMtMi40NTYuMTYxLTEuMTU5LjM3MS0yLjQ3LjU4OC0zLjMxNS40NjYtMS44MTYgMy4wODctMy4xNjUgNS40OTgtNC4yMDIgMS4yNDgtLjUzNyAxLjUxOC0uODYgMi43NzQtMS40MDkuMDctLjMzNC4wOTgtLjY3Ni4wODQtMS4wMTdsMS4wNjgtLjEyN3MuMTQuMjU1LS4wODUtMS4yNDVjMCAwLTEuMi0uMzExLTEuMjU2LTIuNyAwIDAtLjkwMi4zLS45NTYtMS4xNDctLjAzOS0uOTgtLjgwOC0xLjgzMi4yOTktMi41MzdsLS41NjQtMS41MDJzLS41OTItNS44IDIuMDA1LTUuMzMiLz48L3N2Zz4=';
					transItem.name = name || 'Система';
					
					return transItem;
				});
			}
            tranzactions.value = data.tranzactions;
        } catch (error) {
            console.error('Error loading tranzactions:', error);
        } finally {
            isLoading.value = false;
        }
    });
</script>

<template>
    <div v-if="!isLoading">
        <TableItemListDesc :items="tranzactions" :header-items="headerItems"/>
    </div>
    <div v-else>
        <B24Loader/>
    </div>
</template>