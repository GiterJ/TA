<!-- 与心理咨询师聊天界面 -->
<template>
    <div class="treat-chat">
        <!-- 头部 -->
        <Header :title="route.query.name" />
        <!-- 漂流瓶心声 -->
        <div class="heart-sound">
            <DbottleHeartSound :content="bottleData.content" />
        </div>
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
import DbottleHeartSound from '../components/DbottleHeartSound.vue';
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
    let res;
    try {
        res = await DriftControllerService.commentBottleUsingPost({
            bottleId: route.query.id,
            detail: sendmsg,
            replyUserId: UserInfoStore.userinfo.id,
        })
        if (res.code == 0) {
            showToast('回复成功！')
        } else {
            throw (res.message)
        }
    } catch (e) {
        showToast(e)
    }
}

// 挂载时获取数据
onMounted(async () => {
    let res;
    try {
        res = await DriftControllerService.getBottleVoByIdUsingGet(route.query.id)
        if (res.code == 0) {
            bottleData.value = res.data
            // 如果comments有东西，既曾经被评论过
            if (bottleData.value.comments != null) {
                // debugger;
                bottleData.value.comments.forEach(e => {
                    let res = {};
                    // 是自己发的
                    if (e.userId == UserInfoStore.userinfo.id) {
                        res.type = 'right';
                        res.name = '我';
                        res.avatar = e.userAvatar;
                    }
                    // 不是自己发的
                    else {
                        res.type = 'leftGray';
                        res.name = e.replyUserName;
                        res.avatar = e.replyUserAvatar;
                    }
                    res.text = e.detail;
                    textList.push(res)
                });
            }
        } else {
            throw (res.message)
        }
    } catch (e) {
        showToast('加载信息失败' + e)
    }

})
</script>

<style scoped lang="less">
.treat-chat {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-color: white;
    margin: 0 auto;
    text-align: center;
    font-family: "Source Han Sans CN Regular";

    // background-color: skyblue;
    // border: 1px solid black;

    .heart-sound {
        margin: 2vh auto;
    }

    .chatboxs {
        overflow-y: auto;
        box-sizing: border-box;
        margin-top: 0.5vh;
        padding-left: 4vw;
        padding-bottom: 6vh;
        width: 100vw;
        height: 90vh;
        text-align: center;
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