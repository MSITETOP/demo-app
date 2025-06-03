
<script setup>
    const store = useGlobalState();
    const containerClasses = ref(['rounded-lg', 'pr-8', 'pl-8']);
    const h1Classes = ref(['mb-8']);
    
    // Функция для проверки ширины экрана
    function checkScreenSize() {
        if (window.innerWidth < store.w) {
            store.setModeView('mobile');
        } else {
            store.setModeView('decktop');
        }

        containerClasses.value = window.innerWidth <= 768 ? ['rounded-lg-top'] : ['rounded-lg', 'pr-8', 'pl-8'];
        h1Classes.value = window.innerWidth <= 768 ? ['mb-6'] : ['mb-8'];
    }

    onMounted(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', checkScreenSize);
    });
</script>
<template>
    <template v-if="store.modeView ==='preloader'">
        <PreloaderMain/>
        <slot/>
    </template>
    <template v-else>
        <Header/>
        <main class="main-style">
            <div :class="['container mx-auto pt-6 pb-6 bg-white', ...containerClasses]">
                <h1 :class="['text-4.5xl text-center', ...h1Classes]">{{store.title}}</h1>
                <slot/>
            </div>
        </main>
        <Footer/>
    </template>
</template>

<style>
    .main-style {
        padding-top: 60px;
        min-height: calc(100vh - 84px);
    }
    .rounded-lg-top {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }
</style>