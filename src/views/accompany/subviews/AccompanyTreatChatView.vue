<!-- 与心理咨询师聊天界面 -->
<template>
    <div class="treat-chat">
        <!-- 头部 -->
        <Header :title="route.query.name" />
        <!-- 对话记录展示框 -->
        <div class="chatboxs" ref="chatboxs">
            <chat-box v-for="(item, index) in textList" :key="index" :text="item.text" :type="item.type"
                :name="item.name" />
        </div>

        <!-- 输入框 -->
        <div class="sendbox">
            <div class="typein">
                <van-cell-group inset>
                    <van-field v-model="sms" left clearable label="">
                    </van-field>
                </van-cell-group>
            </div>
            <div class="button">
                <van-button size="small" type="primary" @click="sendMessage">发送</van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { DriftControllerService } from '@/generated';
import { computed, onMounted, ref, nextTick, reactive } from 'vue';
import { showToast } from 'vant';
import useUserInfoStore from '@/stores/userinfo';
import { useRoute } from 'vue-router';

const route = useRoute()

const chatboxs = ref()
const sms = ref("")
const textList = reactive([

])
// 接收到的历史消息
const bottleData = ref({})
const UserInfoStore = useUserInfoStore()

// 发送信息
const sendMessage = async () => {
    let sendmsg = sms.value;
    sms.value = "";
    textList.push({
        text: sendmsg,
        name: '我',
        type: 'right',
        avatar: ""
    })
    nextTick(() => {
        chatboxs.value.scrollTop = chatboxs.value.scrollHeight;
    })
}

</script>

<style scoped lang="less">
.treat-chat {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-color: white;
    margin: 0 auto;
    text-align: center;
    // background-color: skyblue;
    // border: 1px solid black;
    font-family: "Source Han Sans CN Regular";

    .heart-sound {
        margin: 2vh auto;
    }

    .chatboxs {
        overflow-y: auto;
        box-sizing: border-box;
        margin-top: 0.5vh;
        width: 100vw;
        height: 90vh;
        // border: 1px solid black;
    }

    .sendbox {
        background-color: #F2F5FF;
        position: fixed;
        // border: 1px solid black;
        overflow: hidden;
        bottom: 0px;
        min-height: 6vh;
        width: 100vw;

        .typein {
            position: absolute;
            bottom: 0.5vh;
            width: 85vw;
            height: 4.5vh;
            margin: 0 auto;
            left: 0vw;
        }

        .button {
            position: absolute;
            bottom: 1vh;
            right: 2vw;
        }
    }
}


:deep(.van-cell) {
    padding: 0px 10px 0px 2.5vw;
    line-height: 4.5vh;
    height: 4.3vh;
    font-size: 13px;
}

:deep(.van-button--small) {
    height: 4.1vh;
    width: 16vw;
    font-size: 12px;
    background: #5473E8;
    border: 0;
}
</style>