<script setup>
import {B24Frame,useB24Helper,LoadDataType,LoggerBrowser,Type} from '@bitrix24/b24jssdk';

    const contIdForm = 'form_container_'+Math.floor(Math.random()*100000);

    const { $BX24 } = useNuxtApp();
    const {initB24Helper,destroyB24Helper,getB24Helper} = useB24Helper();

    onMounted(async ()=>{
        try {
            await initB24Helper(
                $BX24,
                [
                    LoadDataType.Profile,
                    LoadDataType.App,
                ]
            );
            const propertiesForB24Form = getB24Helper().forB24Form;
            console.log(propertiesForB24Form);
            
            const script = document.createElement('script');
            script.innerHTML = `(function(w,d,u){
                    var s=d.createElement('script');
                    s.async=true;s.src=u+'?'+(Date.now()/180000|0);
                    var h=d.getElementsByTagName('script')[0];
                    h.parentNode.insertBefore(s,h);
                })(window,document,'https://upload-portal.storage.yandexcloud.net/crm/form/loader_84_ohyebb.js');`;
            script.setAttribute('data-b24-form', 'inline/76/9defil');
            script.setAttribute('data-skip-moving', 'true');
            document.getElementById(contIdForm).appendChild(script);
            // (function(w,d,u){
            //     const s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
            //     const h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
            // })(window,document,'https://upload-portal.storage.yandexcloud.net/crm/form/loader_76_9defil.js');
        } catch(e) {console.error(e)}
    });
    onUnmounted(async ()=>{console.log('onUnmounted')});
</script>

<!-- <script data-b24-form="inline/84/ohyebb" data-skip-moving="true">
    (function(w,d,u){
        var s=d.createElement('script');
        s.async=true;s.src=u+'?'+(Date.now()/180000|0);
        var h=d.getElementsByTagName('script')[0];
        h.parentNode.insertBefore(s,h);
    })(window,document,'https://upload-portal.storage.yandexcloud.net/crm/form/loader_84_ohyebb.js');
</script> -->

<template>
    <div :id="contIdForm"/>
</template>