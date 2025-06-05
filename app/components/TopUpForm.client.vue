<script setup>
const B24FormConfig = {
    formId: 77,
    secret: 'pstxkg',
    loaderScript: 'https://upload-portal.storage.yandexcloud.net/crm/form/loader_77_pstxkg.js',
}

onMounted(async () => {
    let iframe = document.getElementById('iframe-b24-form')
    iframe.srcdoc = `<!doctype html>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			<body><div class=""><\/div><script data-b24-form="inline\/${B24FormConfig.formId}\/${B24FormConfig.secret}" data-skip-moving="true">
				
				(function(w,d,u){
					const s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()\/180000|0);
					const h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
				})(window,document,'${B24FormConfig.loaderScript}');
			<\/script><\/body>`

})
</script>
  
<template>
    <div>
        <iframe id="iframe-b24-form" class="w-full h-screen mt-0"></iframe>
    </div>
</template>