<script setup>
    onMounted(async ()=>{
        let iframe = document.getElementById('iframe-b24-form')
        iframe.srcdoc = `<!doctype html>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <style>
				div.bx-livechat-head-wrap {display:none;}
				div.bx-livechat-wrapper {top: 50px;right: 0;left: 0;bottom: 0;width: 100%!important; height: 100%!important;z-index:1!important}
				div.b24-widget-button-wrapper {display:none}
				div.bx-livechat-wrapper {top:0;}
				div.loader {
					width: 100%;
					height: 100%;
					display: absolute;
					background: blue;
				}
			</style>
			<body><div>
                <script>
                window.addEventListener('onBitrixLiveChat', (event) =>
                        {
                            var widget = event.detail.widget;
                            widget.setUserRegisterData({
                                'hash': '12',
                                'name': "34"
                            });
                            widget.setCustomData("567");
                            widget.open();
                            document.getElementsByClassName('bx-livechat-wrapper')[0].style.zIndex = "1";
                });
                (function(w,d,u){
                    var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()\/60000|0);
                    var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
                })(window,document,'https:\/\/upload-portal.storage.yandexcloud.net\/crm\/site_button\/loader_5_yz7pk4.js');
                <\/script>
            <\/div><\/body>`
    });
</script>

<template>
    <div>
        <iframe id="iframe-b24-form" class="w-full h-screen mt-0"></iframe>
    </div>
</template>
