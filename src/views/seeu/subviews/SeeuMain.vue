<!-- 再见一面对话界面 -->

<!-- TODO: 结束时清空messageid -->

<template>
    <!-- 头部 -->
    <van-nav-bar :title="UserInfoStore.userinfo.aiName" class="nav-bar" />
    <div class="seeu-main">
        <!-- 视频播放 -->
        <div class="video">
            <!-- 需要循环播放的过度视频 -->
            <video v-if="videostatus == 0" id="video" autoplay="true" :src="videoUrl"
                style="width: 100%; height: 100%; object-fit: cover" loop="loop"></video>
            <!-- 播放生成的视频 -->
            <video v-else id="video" autoplay="true" :src="videoUrl" :onended="onEnded"
                style="width: 100%; height: 100%; object-fit: cover"></video>
        </div>

        <!-- 对话界面 -->
        <div class="text">
            <chat-box ref="chatboxs" v-for="(item, index) in chatHistory" :key="index" :text="item.text"
                :type="item.type" :name="item.name" />
        </div>

        <!-- 倒计时 -->
        <div class="counter">
            <van-count-down ref="countDown" :time="time" auto-start="true" @finish="cutOff">
                <template #default="timeData">
                    <span style="color: rgba(102, 102, 102, 1); font-size: 14px">倒计时:</span>&nbsp;
                    <span>{{ timeData.minutes }} 分钟</span>
                </template>
            </van-count-down>
        </div>

        <!-- 说话按钮 -->
        <div class="speak-btn">
            <van-button type="primary" @click="startListen" v-if="status == 0" style="padding: 0 20px"><img
                    src="@/assets/canspeak.png" alt="" width="10">&nbsp;点击说话</van-button>
            <van-button type="primary" v-else-if="status == 1"><img src="@/assets/speaking.png" alt=""
                    width="20px">&nbsp;正在聆听</van-button>
            <van-button type="primary" disabled v-else style="padding: 0 42.5px">&nbsp;<img src="@/assets/mute.png"
                    alt="" width="20px"></van-button>
        </div>

        <!-- 挂断 -->
        <div class="cut-off" @click="cutOff">
            挂断通话
        </div>
    </div>

</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCosStore from '@/stores/cos';
import ChatBox from '@/components/ChatBox.vue';
import { AiConsultantControllerService, AiGenerateControllerService, AiPersonInfoControllerService } from '@/generated';
import useUserInfoStore from '@/stores/userinfo';
import { showToast } from 'vant';
import { nextTick } from 'vue';
import 'vant/es/toast/style'

const time = ref(1000 * 60 * 10);
const router = useRouter()
const CosStore = useCosStore()
const route = useRoute()
const UserInfoStore = useUserInfoStore()

// 视频地址
const videoUrl = ref(UserInfoStore.userinfo.aiStillUrl)

// 文字展示窗口
const chatboxs = ref()

// 聊天历史及用户输入
const chatHistory = reactive([])

// 当前状态 0-点击可以说话 | 1-正在聆听 | 2-生成中，不可说话
const status = ref(0)

// 当前视频状态 0-正在播放过渡视频 | 1-正在播放生成视频
const videostatus = ref(0)

// 挂断后处理
const cutOff = async () => {
    let res
    try {
        res = await AiPersonInfoControllerService.closeMessageUsingGet(UserInfoStore.userinfo.messageid)
        if (res.code == 0) {
            router.replace('/seeuindex')
        } else {
            throw(res.message)
        }
    } catch (e) {
        router.replace('/seeuindex')
        showToast('关闭失败，请联系管理员处理', e)
    }
}

// 真正接口
const generate = async (text) => {
    let res
    try {
        res = await AiGenerateControllerService.generateVideoByTextUsingPost({
            userInput: text,
            messageId: UserInfoStore.userinfo.messageid
        })
        if (res.code == 0) {
            // 更换url，更换视频
            videoUrl.value = CosStore.getUrl(res.data.aiVideoUrl)
            // videoUrl.value = res.aiVideoUrl
            videostatus.value = 1
            // 刷新聊天框
            chatHistory.push({
                text: res.data.aiMessage,
                type: 'left',
                name: route.query.aiName
            })
            nextTick(() => {
                chatboxs.value.scrollTop = chatboxs.value.scrollHeight;
            })
        } else {
            throw (res.message)
        }
    } catch (e) {
        status.value = 1
        showToast("生成失败！" + e)
    }
}

// 说话测试--超时时间：10s
const startListen = () => {
    status.value = 1
    // 成功回调
    const success = (text) => {
        // 如果用户没有说话
        if (text == "") {
            // 聆听完成，切换状态
            status.value = 0
            showToast('请点击按钮开始说话')
        }
        else {
            // 聆听完成，切换状态
            status.value = 2
            chatHistory.push({
                text: text,
                type: 'right',
                name: '我'
            })

            nextTick(() => {
                chatboxs.value.scrollTop = chatboxs.value.scrollHeight;
                // 生成视频
                generate(text)
            })
        }
    }

    // 失败回调
    const fail = () => {
        // 聆听完成，切换状态
        status.value = 0
        showToast('请点击按钮开始说话')
    }

    // ! 回调定义必须放在前面 !
    window.xunfeiListenSpeaking.startListen(success, fail, false, true)

    // 测试
    // let text = '123'
    // generate(text)
}

// 非静止视频播放结束回调
const onEnded = () => {
    // 修改url
    videoUrl.value = UserInfoStore.userinfo.aiStillUrl
    status.value = 1
    videostatus.value = 0
    nextTick(() => {
        startListen()
    })
}

</script>

<style scoped lang="less">
.nav-bar {
    background-color: #F2F5FF;
    --van-nav-bar-icon-color: #333333;
}

.seeu-main {
    text-align: center;
    width: 100vw;
    margin-top: 4.5vw;
    overflow: auto;
    font-family: "Source Han Sans CN Regular";

    .video {
        width: 90vw;
        height: 40vh;
        margin: 0 auto;
        border-radius: 5px;
        border: 8px solid RGBA(203, 213, 248, 0.5);
    }

    .text {
        margin: 2vh auto;
        box-sizing: border-box;
        width: 92vw;
        height: 28vh;
        border-radius: 20px;
        background-color: #F3F3F4;
        padding: 2vw 1px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .text::-webkit-scrollbar {
        display: none;
    }

    .counter {
        margin: 1vh auto;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        --van-count-down-text-color: #5473E8;
        --van-count-down-font-size: 17px;

        .colon {
            display: inline-block;
            margin: 0 4px;
            color: #1989fa;
        }

        .block {
            display: inline-block;
            width: 22px;
            color: #5473E8;
            font-size: 12px;
            text-align: center;
        }
    }

    .speak-btn {
        margin: 1vh 0;
        --van-button-primary-background: RGBA(84, 115, 232, 1);
        --van-button-primary-border-color: RGBA(84, 115, 232, 1)
    }

    .cut-off {
        margin-top: 2vh;
        font-size: 10px;
        text-decoration: underline;
        color: #CC2525;
    }
}
</style>