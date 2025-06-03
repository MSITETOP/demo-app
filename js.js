let botList = {};
let memberId;
BX24.init(() => {
    BX24.fitWindow(data => {
       let x = BX24.getScrollSize();
       BX24.resizeWindow(x.scrollWidth, (x.scrollHeight))
    })
    let arAI = [];
    BX24.callMethod('ai.engine.list',{},
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                //console.info(result.data());
                const dataList = result.data();
                dataList.forEach(item => {
                    arAI.push(item.code);
                    const element = document.querySelector(`[data-id="${item.code}"]`);
                    if (element) {
                        element.classList.add('active');
                        element.textContent = "Р”РµР°РєС‚РёРІРёСЂРѕРІР°С‚СЊ";
                    }
                });
            }
        }
    );
    BX24.callMethod('imbot.bot.list',{},
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                //console.info(result.data());
                const dataList = result.data();
                Object.keys(dataList).forEach(key => {
                    const item = dataList[key];
                    botList[item.CODE] = item.ID;
                    arAI.push(item.CODE);
                    const element = document.querySelector(`[data-id="${item.CODE}"]`);
                    if (element) {
                        element.classList.add('active');
                        element.textContent = "Р”РµР°РєС‚РёРІРёСЂРѕРІР°С‚СЊ";
                    }
                });
            }
        }
    );
    let arUsers = {};
    BX24.callMethod('user.search',{'FILTER':{'USER_TYPE': 'employee', 'ACTIVE':true}},
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                const dataList = result.data();
                dataList.forEach(item => {
                    arUsers[item.ID] = item.NAME+" "+item.LAST_NAME;
                });
                if(result.more())
                    result.next();
                else {
                    //console.log(arUsers);
                    document.querySelectorAll('[class^="user-"]').forEach(element => {
                        const fullClassName = element.className;
                        const userId = fullClassName.replace('user-', '');
                        element.textContent = arUsers[userId];
                    });
                }
            }
        }
    );

    function createBlock(id, data){
        const container = document.getElementById('modellist');
        // РЎРѕР·РґР°С‚СЊ РѕСЃРЅРѕРІРЅРѕР№ Р±Р»РѕРє col-md-6
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-6';

        // РЎРѕР·РґР°С‚СЊ Р±Р»РѕРє card mb-4
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-4';

        // РЎРѕР·РґР°С‚СЊ Р±Р»РѕРє card-body
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';

        // РЎРѕР·РґР°С‚СЊ Р·Р°РіРѕР»РѕРІРѕРє h5
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = data["title"];

        // РЎРѕР·РґР°С‚СЊ РїР°СЂР°РіСЂР°С„ p
        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = data["description"];

        // РЎРѕР·РґР°С‚СЊ РєРЅРѕРїРєСѓ
        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.setAttribute('data-id', id);
        button.textContent = 'РђРєС‚РёРІРёСЂРѕРІР°С‚СЊ';
        if (arAI.includes(id)) {
            button.classList.add('active');
            button.textContent = "Р”РµР°РєС‚РёРІРёСЂРѕРІР°С‚СЊ";
        }
        button.onclick = function() {
            toggleAI(this, data);
        };

        // РЎРѕР±СЂР°С‚СЊ Р±Р»РѕРєРё РІРјРµСЃС‚Рµ
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(button);
        cardDiv.appendChild(cardBodyDiv);
        colDiv.appendChild(cardDiv);

        container.appendChild(colDiv);
        BX24.fitWindow(data => {
           let x = BX24.getScrollSize();
           BX24.resizeWindow(x.scrollWidth, (x.scrollHeight))
        });
    }

    memberId = BX24.getAuth().member_id;
    const url = `/app?member_id=${memberId}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Р•СЃР»Рё РѕР¶РёРґР°РµС‚СЃСЏ JSON-РѕС‚РІРµС‚
      })
      .then(data => {
        //console.log(data); // РћР±СЂР°Р±РѕС‚РєР° РґР°РЅРЅС‹С…
        document.getElementById("total").textContent = data.options.token;
        
        if(data.cozeauth){
            const btnCozeAuth = document.getElementById("coze-auth");
            addCoze(btnCozeAuth)
        }
        
        try {
            const extraBots = JSON.parse(data.options.extra_bots);
            //console.log(extraBots);
            for (const id in extraBots) {
                createBlock(id, extraBots[id]);
            };
        } catch {
            console.warn("РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹С… IA Р°СЃСЃРёСЃС‚РµРЅС‚РѕРІ");
        }
        
        // Р¤СѓРЅРєС†РёСЏ РґР»СЏ С„РѕСЂРјР°С‚РёСЂРѕРІР°РЅРёСЏ timestamp РІ РґР°С‚Сѓ
        function formatTimestamp(timestamp) {
            const date = new Date(timestamp / 1000); // РґРµР»РёРј РЅР° 1000, С‡С‚РѕР±С‹ РїРѕР»СѓС‡РёС‚СЊ РєРѕСЂСЂРµРєС‚РЅС‹Р№ Unix timestamp
            return date.toLocaleDateString(); // РїСЂРµРѕР±СЂР°Р·СѓРµРј РІ СЃС‚СЂРѕРєСѓ СЃ РґР°С‚РѕР№ Рё РІСЂРµРјРµРЅРµРј
        }
        function getUser(id) {
            if(id == 0)
                return `<span>РЎРёСЃС‚РµРјР°</span>`;
            else
                return `<a href="#" class="${(arUsers[id])?'':'user-'+id}" onclick="BX24.openPath('/company/personal/user/${id}/')">${(arUsers[id])?arUsers[id]:id}</a>`;
        }

        // РџРѕР»СѓС‡Р°РµРј С‚Р°Р±Р»РёС†Сѓ СЃ РєР»Р°СЃСЃРѕРј "table"
        const table = document.querySelector('tbody');

        let page = 1;
        const pageCount = 20;
        let trasList = data.tranzactions.slice((page - 1) * pageCount, (page) * pageCount);

        function renderTable() {
            table.innerHTML = ''; // РћС‡РёС‰Р°РµРј С‚Р°Р±Р»РёС†Сѓ РїРµСЂРµРґ РґРѕР±Р°РІР»РµРЅРёРµРј РЅРѕРІС‹С… СЃС‚СЂРѕРє
            trasList.forEach(item => {
                const row = document.createElement('tr');

            // РЎРѕР·РґР°РµРј СЏС‡РµР№РєРё РґР»СЏ РєР°Р¶РґРѕР№ РєРѕР»РѕРЅРєРё
            const dateCell = document.createElement('td');
            dateCell.textContent = formatTimestamp(item.timestamp);

            const transactionCell = document.createElement('td');
            transactionCell.textContent = item.cost > 0 ? `+${item.cost}` : item.cost;

            const userCell = document.createElement('td');
            userCell.innerHTML = getUser(item.user_id);

            // Р”РѕР±Р°РІР»СЏРµРј СЏС‡РµР№РєРё РІ СЃС‚СЂРѕРєСѓ
            row.appendChild(dateCell);
            row.appendChild(transactionCell);
            row.appendChild(userCell);

                // Р”РѕР±Р°РІР»СЏРµРј СЃС‚СЂРѕРєСѓ РІ С‚Р°Р±Р»РёС†Сѓ
                table.appendChild(row);
            });
        }

        function renderPagination() {
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = ''; // РћС‡РёС‰Р°РµРј РїР°РіРёРЅР°С†РёСЋ РїРµСЂРµРґ РґРѕР±Р°РІР»РµРЅРёРµРј РЅРѕРІС‹С… СЌР»РµРјРµРЅС‚РѕРІ

            const totalPages = Math.ceil(data.tranzactions.length / pageCount);
            const maxVisiblePages = 6; // РњР°РєСЃРёРјР°Р»СЊРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РѕС‚РѕР±СЂР°Р¶Р°РµРјС‹С… СЃС‚СЂР°РЅРёС†

            // Р”РѕР±Р°РІР»СЏРµРј РєРЅРѕРїРєСѓ "РќР°Р·Р°Рґ"
            if (page > 1) {
                const prevItem = document.createElement('li');
                prevItem.className = 'page-item';
                const prevLink = document.createElement('a');
                prevLink.className = 'page-link';
                prevLink.href = '#';
                prevLink.textContent = 'вЂ№';
                prevLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (page > 1) {
                        page--;
                        trasList = data.tranzactions.slice((page - 1) * pageCount, (page) * pageCount);
                        renderTable();
                        renderPagination();
                    }
                });
                prevItem.appendChild(prevLink);
                pagination.appendChild(prevItem);
            }

            // РћС‚РѕР±СЂР°Р¶Р°РµРј СЃС‚СЂР°РЅРёС†С‹
            const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                const pageItem = document.createElement('li');
                pageItem.className = 'page-item' + (i === page ? ' active' : '');
                const pageLink = document.createElement('a');
                pageLink.className = 'page-link';
                pageLink.href = '#';
                pageLink.textContent = i;
                pageLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    page = i;
                    trasList = data.tranzactions.slice((page - 1) * pageCount, (page) * pageCount);
                    renderTable();
                    renderPagination();
                });

                pageItem.appendChild(pageLink);
                pagination.appendChild(pageItem);
            }

            // Р”РѕР±Р°РІР»СЏРµРј РєРЅРѕРїРєСѓ "Р’РїРµСЂРµРґ"
            if (page < totalPages) {
                const nextItem = document.createElement('li');
                nextItem.className = 'page-item';
                const nextLink = document.createElement('a');
                nextLink.className = 'page-link';
                nextLink.href = '#';
                nextLink.textContent = 'вЂє';
                nextLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (page < totalPages) {
                        page++;
                        trasList = data.tranzactions.slice((page - 1) * pageCount, (page) * pageCount);
                        renderTable();
                        renderPagination();
                    }
                });
                nextItem.appendChild(nextLink);
                pagination.appendChild(nextItem);
            }
        }

        renderTable();
        renderPagination();
      }).catch(error => {
        console.error('РћС€РёР±РєР° РїСЂРё РІС‹РїРѕР»РЅРµРЅРёРё Р·Р°РїСЂРѕСЃР°:', error);
      });
});
function authCoze(button){
    addCoze(button);
    const url = "https://www.coze.com/api/permission/oauth2/authorize?response_type=code&client_id=37543932253037586079121083629541.app.coze&redirect_uri=https://ai.app.ipgpromo.ru/coze-auth&state="+memberId;
    window.open(url, "_blank");
}

function addCoze(button){
    button.textContent = "РџРѕРґРєР»СЋС‡РµРЅРѕ";
    button.classList.add('active');
    button.disabled = true;
    
    const newButton = document.createElement('button');
    newButton.textContent = '+'; 
    newButton.className = 'btn btn-primary mx-1'; 
    newButton.setAttribute('data-bs-toggle', 'modal');
    newButton.setAttribute('data-bs-target', '#addBotForm');
    button.insertAdjacentElement('afterend', newButton);
}

function addBot(e){
    e.preventDefault();

    const form = e.target;
    const bot_id = form.elements['bot_id'].value;
    const bot_type = form.elements['bot_type'].value;

    fetch('/cozebot-add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bot_id: bot_id,
            bot_type: bot_type,
            member_id: memberId,
        }), 
    })
    .then(response => response.json())
    .then(data => {
        console.log('РћС‚РІРµС‚:', data);
        if(data.name){
            alert("Р‘РѕС‚ '"+data.name+"' РґРѕР±Р°РІР»РµРЅ, РјРѕР¶РЅРѕ РµРіРѕ Р°РєС‚РёРІРёСЂРѕРІР°С‚СЊ");
            location.reload();
        } else {
            alert("РћС€РёР±РєР° РґРѕР±Р°РІР»РµРЅРёСЏ Р±РѕС‚Р°: "+data.error);
        }
    })
    .catch((error) => {
        console.error('РћС€РёР±РєР°:', error);
    });
}

function toggleAI(button, data){
        const cardDiv = button.closest('.card');
        const isActive = button.classList.contains('active');
        const dataId = button.getAttribute('data-id');
        const context = button.getAttribute('data-context');
        const cardTitle = cardDiv.querySelector('.card-title').textContent;
        // console.log('data-id СЂРѕРґРёС‚РµР»СЊСЃРєРѕРіРѕ СЌР»РµРјРµРЅС‚Р°:', dataId);
        // console.log('РўРµРєСЃС‚ РёР· h5.card-title:', cardTitle);
        // console.log('РќР°Р»РёС‡РёРµ РєР»Р°СЃСЃР° active:', isActive);
        if(isActive){
            button.classList.remove('active');
            button.textContent = "РђРєС‚РёРІРёСЂРѕРІР°С‚СЊ";
            if(dataId.startsWith("ipg")){
                BX24.callMethod(
                    'ai.engine.unregister',
                    {
                        code: dataId,
                    },
                    function(result)
                    {
                        if(result.error())
                        {
                            console.error(result.error());
                        }
                        else
                        {
                            console.info(result.data());
                        }
                    }
                );
            } else {
                BX24.callMethod(
                    'imbot.unregister',
                    {
                        'BOT_ID': botList[dataId]
                    },
                    function(result)
                    {
                        if(result.error())
                        {
                            console.error(result.error());
                        }
                        else
                        {
                            console.info(result.data());
                        }
                    }
                );
            }
        } else {
            button.classList.add('active');
            button.textContent = "Р”РµР°РєС‚РёРІРёСЂРѕРІР°С‚СЊ";
            
            if(dataId.startsWith("ipg")){
                BX24.callMethod(
                    'ai.engine.register',
                    {
                        name: 'Р“РµРЅРЅР°РґРёР№ РџРµРўСЂРѕРІРёС‡ ( '+cardTitle+' )',
                        code: dataId,
                        category: 'text',
                        completions_url: 'https://'+window.location.host+'/message?bot='+dataId,
                        settings: {
                            code_alias: 'ChatGPT',
                            model_context_type: 'token',
                            model_context_limit: (context)?context:16*1024,
                        },
                    },
                    function(result)
                    {
                        if(result.error())
                        {
                            console.error(result.error());
                        }
                        else
                        {
                            console.info(result.data());
                        }
                    }
                );
            } else {
                BX24.callMethod(
                    'imbot.register',
                    {
                        CODE: dataId, // РЈРЅРёРєР°Р»СЊРЅС‹Р№ РєРѕРґ РІР°С€РµРіРѕ Р±РѕС‚Р°
                        TYPE: data['type'], // РўРёРї, B вЂ“ С‡Р°С‚-Р±РѕС‚, РѕС‚РІРµС‚С‹ РїРѕСЃС‚СѓРїР°СЋС‚ СЃСЂР°Р·Сѓ, O вЂ“ С‡Р°С‚-Р±РѕС‚ РґР»СЏ РћС‚РєСЂС‹С‚С‹С… Р»РёРЅРёР№, S вЂ“ С‡Р°С‚-Р±РѕС‚ СЃ РїРѕРІС‹С€РµРЅРЅС‹РјРё РїСЂРёРІРёР»РµРіРёСЏРјРё (supervisor)
                        EVENT_HANDLER: 'https://'+window.location.host+'/botmsg',
                        PROPERTIES: {
                            NAME: 'Р“РµРЅРЅР°РґРёР№ РџРµРўСЂРѕРІРёС‡ ( '+cardTitle+' )', // РРјСЏ С‡Р°С‚-Р±РѕС‚Р°
                        }
                    },
                    function(result)
                    {
                        if(result.error())
                        {
                            console.error(result.error());
                        }
                        else
                        {
                            console.info(result.data());
                        }
                    }
                );
            }
        }
}