import { useGlobalState } from '~/stores/globalState';
export default defineNuxtPlugin(async (nuxtApp) => {

    const store = useGlobalState();
    try {
		const { $initializeB24Frame } = useNuxtApp();
		const BX24 = await $initializeB24Frame();
		const {member_id} = BX24.auth.getAuthData();
		const response = await fetch('https://ai.app.ipgpromo.ru/app?member_id='+member_id);
		const data = await response.json();
		const users = await BX24.callMethod('user.search',{'FILTER':{'USER_TYPE': 'employee', 'ACTIVE':true}});
		const engineData = await BX24.callMethod('ai.engine.list',{});
		const botData = await BX24.callMethod('imbot.bot.list',{});
		const botCodeList = {};
		const {tranzactions, options} = data;

		if (tranzactions && tranzactions.length && users.isSuccess) {
			const usersData = users.getData().result;
			if (usersData.length) {
				data.tranzactions.map(transItem => {
					const {user_id} = transItem;
					const userData = usersData.filter(ar=>(+ar.ID) === (+user_id))[0] || {};
					let name = '';
					if (userData.NAME) name += userData.NAME;
					if (userData.LAST_NAME) name += ' '+userData.LAST_NAME;
					transItem.src = userData.PERSONAL_PHOTO || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0ic2l6ZS0yNCB0ZXh0LWJhc2UtbWFzdGVyIGRhcms6dGV4dC1iYXNlLTIwMCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS42NDUgMTEuNzEzYy0xLjA1NC0xLjY3IDcuODMyLTMuMDU3IDguNDIyIDIuMDU0YTE1LjYgMTUuNiAwIDAgMSAwIDQuNjQ3czEuMzI4LS4xNTIuNDQyIDIuMzcyYzAgMC0uNDg4IDEuODE2LTEuMjM4IDEuNDA4IDAgMCAuMTIyIDIuMjk2LTEuMDU4IDIuNjg1IDAgMCAuMDg0IDEuMjIzLjA4NCAxLjMwNmwuOTg2LjE0N3MtLjAzIDEuMDIuMTY3IDEuMTNjLjkuNTggMS44ODYgMS4wMjEgMi45MjMgMS4zMDUgMy4wNjIuNzc3IDQuNjE2IDIuMTEgNC42MTYgMy4yNzhsLjgyMyA0LjE4OWMtMy41NDQgMS40ODUtNy42NTcgMi4zNzMtMTIuMDU1IDIuNDY2SDI0LjIyYy00LjM4OS0uMDkzLTguNDkzLS45NzctMTIuMDMtMi40NTYuMTYxLTEuMTU5LjM3MS0yLjQ3LjU4OC0zLjMxNS40NjYtMS44MTYgMy4wODctMy4xNjUgNS40OTgtNC4yMDIgMS4yNDgtLjUzNyAxLjUxOC0uODYgMi43NzQtMS40MDkuMDctLjMzNC4wOTgtLjY3Ni4wODQtMS4wMTdsMS4wNjgtLjEyN3MuMTQuMjU1LS4wODUtMS4yNDVjMCAwLTEuMi0uMzExLTEuMjU2LTIuNyAwIDAtLjkwMi4zLS45NTYtMS4xNDctLjAzOS0uOTgtLjgwOC0xLjgzMi4yOTktMi41MzdsLS41NjQtMS41MDJzLS41OTItNS44IDIuMDA1LTUuMzMiLz48L3N2Zz4=';
					transItem.name = name || 'No name';
					
					return transItem;
				});
			}
		}

		
		if (options && options.extra_bots) {
			options.extra_bots = JSON.parse(options.extra_bots);

			if (engineData.isSuccess) {
				const engineList = engineData.getData().result;
				if (engineList.length) {
					engineList.forEach(engine => {
						store.updateAsistentsAndBots(engine.code,{active:true});
						if (options.extra_bots[engine.code]) options.extra_bots[engine.code].active = true;
					});
				}
			}

			if (botData.isSuccess) {
				const botList = Object.values(botData.getData().result);
				if (botList.length) {
					botList.forEach(bot => {
						botCodeList[bot.CODE] = bot.ID;
						store.updateAsistentsAndBots(bot.CODE,{active:true});
						if (options.extra_bots[bot.CODE]) options.extra_bots[bot.CODE].active = true;
					});
				}
				// console.log(options.extra_bots,botList);
			}
		}

			// console.log(store.asistents);
		
			nuxtApp.provide('BX24', BX24);
			store.setBotCodeList(botCodeList);
			store.setBalance(options.token);
			store.setAsistentsAndBots(options.extra_bots);
			store.setTransHistory(data.tranzactions);
			store.setMemberId(member_id);
		} catch (error) {
			console.error(error)
		}
});