<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { onMounted, onUnmounted, ref } from "vue";
import { RouterView } from "vue-router";
import HeaderContent from "@/components/HeaderContent.vue";
import FooterContent from "@/components/FooterContent.vue";


const headerRef = ref<HTMLElement>();


onMounted(() => {
    const handleScroll = () => {
        if (headerRef.value) {
            if (window.scrollY > 20) {
                headerRef.value.classList.add("header-on-scroll");
            } else {
                headerRef.value.classList.remove("header-on-scroll");
            }
        }
    };

    window.addEventListener("scroll", handleScroll);
    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
    });
})
</script>


<template>
    <header ref="headerRef">
        <HeaderContent />
    </header>

    <main>
        <RouterView />
    </main>

    <footer>
        <FooterContent />
    </footer>

    <SpeedInsights />
</template>