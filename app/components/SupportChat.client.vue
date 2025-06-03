<script setup>
    import { md5 } from 'js-md5';

    const contId = 'chat_container_'+Math.floor(Math.random()*100000);
    const scriptId = 'id_call_widget_'+Math.floor(Math.random()*100000);
    const { $BX24 } = useNuxtApp();
    
    const callWidget = async (event) => {
        const currentUser = await $BX24.callMethod('user.current');
        const widget = event.detail.widget;
        if (currentUser.isSuccess) {
            const {ID:id, NAME:name,LAST_NAME:lastName} = currentUser.getData().result;

            console.log(md5('u'+id),widget);
            // Установка внешней авторизации пользователя
            // widget.setUserRegisterData({
            //     'hash': md5('u'+id),
            //     'name': `${id} - ${name} ${lastName}`
            // });

            // widget.setCustomData(`${id} - ${name} ${lastName}`+" \n Контакт: ''");
            // widget.open();
            // const chat = document.getElementsByClassName('bx-livechat-wrapper')[0];
            // chat.style.zIndex = "1";
            // document.getElementById(contId).appendChild(chat);
        }
    };

    onMounted(async ()=>{
       try {

            const widgetContainer = document.getElementById(contId);
            // if (widgetContainer) {
            //     widgetContainer.innerHTML = `<style>div.b24-widget-button-position-top-right { top: 5px; right: 20px; }</style>`;
            // }
            
            const script = document.createElement('script');
            script.innerHTML = `
                (function(w,d,u){
                    var s=d.createElement('script');s.async=true;s.id='${scriptId}';s.src=u+'?'+(Date.now()/60000|0);
                    var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
                })(window,document,'https://upload-portal.storage.yandexcloud.net/crm/site_button/loader_5_yz7pk4.js');
            `;
            widgetContainer.appendChild(script);

            window.addEventListener('onBitrixLiveChat', callWidget);

        } catch(e) {console.error(e)}
    });

    onUnmounted(()=>{
        document.getElementById(scriptId).remove();
        window.removeEventListener('onBitrixLiveChat', callWidget);
    });
</script>

        <!-- <span class="loader"></span> -->
        <!-- <script>
            localStorage.clear();
            window.addEventListener('onBitrixLiveChat', function(event) {
                var widget = event.detail.widget;
                // Установка внешней авторизации пользователя
                widget.setUserRegisterData({
                    'hash': '<?=md5("u".$authData['user_id'])?>',
                    'name': "<?=$u["ID"]?> - <?=$u["NAME"]?> <?=$u["LAST_NAME"]?>"
             });
             widget.setCustomData("<?=$u["ID"]?> <?=$u["NAME"]?> <?=$u["LAST_NAME"]?> \n Контакт: <?=$u["UF_CRM_CONTACT"]?>");
             widget.open();
             document.getElementsByClassName('bx-livechat-wrapper')[0].style.zIndex = "1";
            });
            
        </script> -->

<template>
    <div :id="contId"/>
</template>


<style>
    /* div.bx-livechat-head-wrap {display:none;}
    div.bx-livechat-wrapper {top: 50px;right: 0;left: 0;bottom: 0;width: 100%!important; height: 100%!important;z-index:1!important}
    div.b24-widget-button-wrapper {display:none} */
    /* div.bx-livechat-wrapper {top:0;} */
    /* div.loader {
        width: 100%;
        height: 100%;
        display: absolute;
        background: blue;
    } */
</style>