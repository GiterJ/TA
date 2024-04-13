<!-- 公共头部组件 -->
<!-- 展示一个标题，并提供返回按钮 -->
<!-- props: [title:导航栏标题] -->
<template>
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" class="nav-bar"/>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(['title'])
const router = useRouter()

const onClickLeft = () => {
    router.back()
}

</script>

<style scoped lang="less">

.nav-bar {
    background-color: #F2F5FF;
    font-family: "Source Han Sans CN Regular";
    --van-nav-bar-icon-color: #333333;
}

</style>