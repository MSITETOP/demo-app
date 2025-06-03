import { defineStore } from 'pinia';

export const useGlobalState = defineStore('globalState', {
  state: () => ({
      w: 1024,
      showItemsPage: 10,
      currentPage: 1,
      totalPages: 1,
      balance:'Загрузка...',
      modeView:'preloader',
      asistents:{
        asistent_1: {
          title: 'Индивидуальная разработка',
          description: 'Специально созданный для вашего бизнеса ассистент для CoPilot для открытых линий или чатов. Глубоко изучает вашу базу знаний, обеспечивая максимально точные ответы на бизнес-вопросы. Она выполняет поиск в интернете, предоставляет актуальную информацию, помогает в принятии решений, а также генерирует изображения и выполняет код для ваших задач.',
          btnText: 'Запросить',
          click: 'formShow',
          type: 'O',
          price: 'По запросу',
          formPayment: 'За жизнь',
        },
        asistent_2: {
          title: 'Ваш уникальный COZE-ассистент',
          description: 'Создайте и настройте собственного AI-ассистента. Coze — это универсальная платформа для разработки AI-ассистентов на базе искусственного интеллекта. Независимо от ваших навыков программирования, Coze позволяет быстро создавать различных AI-ассистентов, способные справляться с простыми вопросами и сложными диалогами.',
          btnText: 'Подключить',
          click: 'authCoze',
          type: 'B',
          price: 'По запросу',
        },
        ipg_7373377037697990661: {
          title: 'GPT-4o + DALLE-3 + Google Поиск + Просмотр сайтов',
          description: 'Оптимизированная версия GPT-4 для повышения производительности с минимальными затратами ресурсов и высокой точностью. Включает интеграцию DALLE-3 для генерации изображений, Google Поиск для актуальных данных, и возможность просматривать сайты в реальном времени для получения необходимой информации.',
          type: 'O',
          price: 'По запросу',
        },
        ipg_7405523865444679685: {
          title: 'GPT-4o Mini + YandexArt + Google Поиск + Просмотр сайтов',
          description: 'Самая доступная и облегченная версия GPT-4o, предназначенная для выполнения базовых задач с минимальными затратами ресурсов и сниженной стоимостью использования. Включает генерацию изображений в YandexArt, Google Поиск для актуальных данных, и возможность просматривать сайты в реальном времени для получения необходимой информации.',
          type: 'O',
          price: 'По запросу',
        },
        asistent_5: {
          title: 'o1-preview',
          description: 'Погрузитесь в будущее с o1-preview - cамая мощная размыщляющая модель.',
          type: 'O',
          price: 'По запросу',
        },
        ipg_7431779269614813189: {
          title: 'o1-mini',
          description: 'Компактная мощь в ваших руках с o1-mini - думает быстрее, чтоит дешевле.',
          type: 'O',
          price: 'По запросу',
        },
        ipg_7405523404826689542: {
          title: 'Claude 3 Haiku',
          description: 'Легкая версия Claude 3, оптимизированная для кратких текстов и поэтических форм, таких как хайку, с акцентом на креативность.',
          type: 'O',
          price: 'По запросу',
        },
        ipg_7405527427034087429: {
          title: 'Claude 3 Sonnet',
          description: 'Расширенная версия Claude 3, предназначенная для создания более сложных и длинных поэтических форм, таких как сонеты, с фокусом на ритм и рифму.',
          type: 'O',
          price: 'По запросу',
        },
        ipg_7405527427034021893: {
          title: 'Gemini 1.5 Flash',
          description: 'Быстрая версия Gemini 1.5, предназначенная для мгновенного создания контента с акцентом на краткость и скорость генерации.',
          type: 'O',
          price: 'По запросу',
        },
        ipg_7405528236014206982: {
          title: 'Gemini 1.5 Pro',
          description: 'Продвинутая версия Gemini 1.5 с улучшенными возможностями для сложных задач и аналитических сценариев, предлагающая высокую точность и мощь.',
          type: 'O',
          price: 'По запросу',
        },
        // 10: {
        //   title: '',
        //   description: '',
        //   type: 'O',
        //   price: 'По запросу',
        // },
      },
      bots:{
        bot_1: {
          title: 'Индивидуальная разработка',
          description: 'Специально созданный для вашего бизнеса чат-бот для CoPilot для открытых линий или чатов. Глубоко изучает вашу базу знаний, обеспечивая максимально точные ответы на бизнес-вопросы. Она выполняет поиск в интернете, предоставляет актуальную информацию, помогает в принятии решений, а также генерирует изображения и выполняет код для ваших задач.',
          btnText: 'Запросить',
          click: 'formShow',
          type: 'O',
          price: 'По запросу',
        },
        bot_2: {
          title: 'Ваш уникальный COZE-бот',
          description: 'Создайте и настройте собственного чат-бота. Coze — это универсальная платформа для разработки чат-ботов на базе искусственного интеллекта. Независимо от ваших навыков программирования, Coze позволяет быстро создавать различные чат-боты, способные справляться с простыми вопросами и сложными диалогами.',
          btnText: 'Подключить',
          click: 'authCoze',
          type: 'B',
          price: 'По запросу',
        },
      },
      transHistory:{},
      botCodeList:{},
      showItems:[],
      memberId: '',
      linkToInstuction: 'https://vkvideo.ru/playlist/-24162245_45684532',
      cozeUrl: 'https://www.coze.com/api/permission/oauth2/authorize?response_type=code&client_id=37543932253037586079121083629541.app.coze&redirect_uri=https://ai.app.ipgpromo.ru/coze-auth&state=',
  }),
  actions: {
    setTitle(title) {
      this.title =  title;
    },
    setBalance(token) {
      this.balance =  token ? new Intl.NumberFormat('ru-RU').format(token) : 0;
    },
    updateAsistentsAndBots(key, data = {}) {
      if (this.asistents[key]) {
        for (let k in data)
          this.asistents[key][k] = data[k];
      } else if (this.bots[key]) {
        for (let k in data)
          this.bots[key][k] = data[k];
      }
    },

    setAsistentsAndBots(asistentsAndBots) {
      // const bots = {};
      // const asistents = {};
      for (let k in asistentsAndBots) {
        if (asistentsAndBots[k].type === 'B') {
          this.bots[k] = asistentsAndBots[k];
        } else {
          this.asistents[k] = asistentsAndBots[k];
        }
      }
      // this.bots =  bots;
      // this.asistents =  asistents;
    },
    setTransHistory(tranzactions) {
      this.transHistory =  tranzactions;
    },
    setModeView(mode) {
      this.modeView =  mode;
    },
    setShowItemsPage(num) {
      localStorage.setItem('show_items_page', num),
      this.showItemsPage =  num;
    },
    setCurrentPage(num) {
      localStorage.setItem('current_page', num),
      this.currentPage =  num;
    },
    setTotalPages(num) {
      this.totalPages =  num;
    },
    setMemberId(memberId) {
      this.memberId =  memberId;
    },
    setBotCodeList(botCodeList) {
      this.botCodeList =  botCodeList;
    },
    setShowItems(items) {
      this.showItems =  items;
    },
    updateBotCodeList(key,value) {
      this.botCodeList[key] = value;
    },
  },
  getters: {
    getBotIdByCode: state => code => state.botCodeList[code],
    getStartSlice: state => (state.currentPage - 1) * state.showItemsPage,
  }
});