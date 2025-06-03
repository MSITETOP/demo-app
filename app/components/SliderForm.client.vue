<script setup>
    const contId = 'form_container_'+Math.floor(Math.random()*100000);
    onMounted(()=>{
        try {
            const script = document.createElement('script'),firstScript = document.getElementsByTagName("script")[0];
            script.src =
            'https://upload-portal.storage.yandexcloud.net/crm/form/loader_76_9defil.js? ' +
            Math.floor(Date.now() / 180000);
            script.async = true;
            script.setAttribute('data-b24-form', 'inline/76/9defil');
            script.setAttribute('data-skip-moving', 'true');
            script.setAttribute('data-b24-loaded', 'true');
            firstScript.parentNode.insertBefore(script,firstScript);
            document.getElementById(contId).appendChild(script);
            // (function(w,d,u){
            //     const s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
            //     const h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
            // })(window,document,'https://upload-portal.storage.yandexcloud.net/crm/form/loader_76_9defil.js');
        } catch(e) {console.error(e)}
    });
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
    <div :id="contId"/>
</template>