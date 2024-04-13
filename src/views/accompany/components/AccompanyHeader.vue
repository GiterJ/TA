<!-- AI 咨询模块头部导航 -->
<template>
    <van-tabs v-model:active="NavStore.accompanyactive" animated="true" swipeable="true" color="#5473E8" style="--van-tab-font-size:11px">
        <van-tab :title="item.title" v-for="(item, index) in datas" :key="index" :to="item.to" replace>
            <template #title>
                {{ item.title }}
            </template>
        </van-tab>
    </van-tabs>
</template>

<script setup>
import { useNavStore } from '@/stores/nav'

// 导航活跃标签数据
const NavStore = useNavStore();

const datas = [
    {
        title: "AI小伴",
        icon: "smile-o",
        to: "/accompany/friend"
    },
    {
        title: "AI心理咨询",
        icon: "like-o",
        to: "/accompany/consultation"
    },
    {
        title: "人工哀伤治疗师",
        icon: "manager-o",
        to: "/accompany/treat"
    },
]

</script>

<style scoped lang="less">
:deep(.van-tabs__line) {
    box-shadow: 0px 2px 2px 0px #5473e8;
    bottom: 26px;
}

:deep(.van-tab--active){
    font-size: 15px;
}
</style>