<!-- 漂流瓶列表 -->
<!-- ！！需要修改，进入组件时再请求数据 -->
<template>
    <van-list>
        <ChatItem v-for="(item, index) in recvList" :key="index" :userName="item.userName"
            :userAvatar="item.userAvatar" :text="item.content" @click="enterBottleChat(item.bottleId, item.userName)"/>
    </van-list>
</template>

<script setup>
import { useRouter } from 'vue-router';
import ChatItem from '@/components/ChatItem.vue';
import useBottleStore from '@/stores/bottle';
import { ref, watchEffect } from 'vue';

const router = useRouter()
const BottleStore = useBottleStore()

// 获取信息
const recvList = ref([])
watchEffect(()=>{
    BottleStore.processRecords(BottleStore.bottleListRecv, recvList)
    console.log(recvList.value)
})

// console.log(recvList)
const enterBottleChat = (id, name) => {
    router.push({
        path:'/dbottlechat',
        query:{
            id: id,
            name: name
        }
    })
}
</script>

<style scoped lang="less"></style>