<template>
    <!-- 头部 -->
    <van-nav-bar title="心声漂流瓶" style="background-color: #F2F5FF;" />

    <div class="dbottlesindex">
        <!-- 侧边导航 -->
        <div class="nav">
            <van-tabs v-model:active="NavStore.bottleactive" color="#5473E8" title-inactive-color="#666666"
                swipeable="true" animated="true" line-height="4px">
                <van-tab title="我发出的" :to="{ name: 'sendlist' }"></van-tab>
                <van-tab title="我收到的" :to="{ name: 'recvlist' }"></van-tab>
            </van-tabs>
        </div>
        <!-- 消息列表页面 -->
        <div class="msglist">
            <RouterView />
        </div>
        <van-floating-bubble icon="plus" @click="onClick" v-model:offset="offset" class="bubble-button"
            style="--van-floating-bubble-background:#5473e8;--van-floating-bubble-size:50px;
            box-shadow: 0px 0px 20px 0px #5473e8;" />
    </div>

    <NavFooter />
</template>

<script setup>
import NavFooter from '@/components/NavFooter.vue';
import { useRouter } from 'vue-router';
import { useNavStore } from '@/stores/nav';
import { RouterView } from 'vue-router';
import { reactive } from 'vue';
import { ref } from 'vue';

const router = useRouter()
const NavStore = useNavStore()

const offset = ref({ y: 550 })


const onClick = () => {
    router.push('/ocean')
}




</script>


<style scoped lang="less">
.dbottlesindex {
    padding: 0 0 50px 0;
    --van-tab-font-size: 11px;
    font-family: "Source Han Sans CN Regular";

    .msglist {
        margin-top: 1vh;
    }

    .bubble-button {}
}


:deep(.van-tabs__line) {
    box-shadow: 0px 2px 3px 0px #5473e8;
    bottom: 26px;
}

// 改变active标签的字体大小
:deep(.van-tab--active) {
    font-size: 15px;
}
</style>