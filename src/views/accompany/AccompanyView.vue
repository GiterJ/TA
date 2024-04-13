<template>
    <van-nav-bar title="AI咨询" class="nav-bar" />
    <AccompanyHeader />
    <RouterView />
    <NavFooter v-if="navControl != 0" />
</template>

<script setup>
import NavFooter from '@/components/NavFooter.vue';
import AccompanyHeader from './components/AccompanyHeader.vue';
import { onMounted, ref } from 'vue';

// 底部导航栏显示控制变量
const navControl = ref(1)

// 添加事件监听软键盘
onMounted(() => {
    window.addEventListener('native.keyboardhide', (e) => {
        navControl.value = 1
    });
    window.addEventListener('native.keyboardshow', (e) => {
        navControl.value = 0
    });
})


</script>


<style scoped lang="less">
.nav-bar {
    background-color: #F2F5FF;
    --van-nav-bar-icon-color: #333333;
}
</style>