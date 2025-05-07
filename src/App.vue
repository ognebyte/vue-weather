<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import { onMounted, onUnmounted, ref } from "vue";


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
        <Header />
    </header>

    <main>
        <RouterView />
    </main>

    <footer>
        
    </footer>
</template>