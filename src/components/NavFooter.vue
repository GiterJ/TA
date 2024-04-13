<template>
    <van-tabbar v-model="NavStore.active" style="background-color: #F2F5FF;">
        <van-tabbar-item v-for="(item, index) in NavDatas" :key="index" :to="item.to" replace
            style="background-color: #F2F5FF;">
            <span style="font-size: 0.8em; color: black; font-family: 'Source Han Sans CN Regular'" v-if="NavStore.active == item.index">{{ item.name }}</span>
            <span style="font-size: 0.8em; color: #999999; font-family: 'Source Han Sans CN Regular'" v-else>{{ item.name }}</span>
            <template #icon="props">
                <img :src="props.active ? item.active : item.deactive" />
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script setup>
import { useNavStore } from '@/stores/nav';

const NavStore = useNavStore()
const NavDatas = NavStore.navDatas

</script>

<style scoped lang="less">
:root:root {
    --van-tabbar-background: #F2F5FF;
    --van-tabbar-item-text-color: #F2F5FF;
}
</style>