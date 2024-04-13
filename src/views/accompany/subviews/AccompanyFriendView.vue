<!-- AI 小伴页面 -->

<template>
  <div class="friend-main">
    <!-- 虚拟形象 -->
    <!-- <div class="virtualman"></div> -->
    <!-- 对话框 -->
    <div class="chat">
      <!-- 对话记录展示框 -->
      <div class="chatboxs" ref="chatboxs">
        <chat-box v-for="(item, index) in textList" :key="index" :text="item.text" :type="item.type"
          :name="item.name" />
      </div>

      <!-- 输入框 -->
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
import { ref, reactive, nextTick, watch, onMounted } from 'vue';
import ChatBox from '@/components/ChatBox.vue';
import useUserInfoStore from '@/stores/userinfo';
import 'vant/es/toast/style'
import { showToast } from 'vant';
import { AiCompanyControllerService } from '@/generated';
import useAichatStore from '@/stores/aichat';

const sms = ref("");
let chatboxs = ref();
const UserInfoStore = useUserInfoStore()
const AichatStore = useAichatStore()

const textList = ref([])

onMounted(() => {
  if (AichatStore.accompanyFrientHistory != "") {
    AichatStore.processRecordsFriend(AichatStore.accompanyFrientHistory, textList)
  }
})

watch(AichatStore.accompanyFrientHistory, () => {
  if (AichatStore.accompanyFrientHistory != "") {
    AichatStore.processRecordsFriend(AichatStore.accompanyFrientHistory, textList)
  }
})

const sendMessage = async () => {
  let sendmsg = sms.value;
  if (sms.value == "") {
  } else {
    sms.value = "";
    textList.value.push({
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
      res = await AiCompanyControllerService.chatUsingPost({
        chatId: UserInfoStore.userinfo.chatCompanyID,
        userInput: sendmsg
      })
      if (res.code == 0) {
        textList.value.push({
          text: res.data.reply,
          name: 'TA',
          type: 'left',
          avatar: ""
        })
      } else {
        throw (res.message)
      }
    } catch (e) {
      showToast(e)
    }
    nextTick(() => {
      chatboxs.value.scrollTop = chatboxs.value.scrollHeight;
    })
  }
}

</script>

<style scoped lang="less">
.friend-main {
  font-family: "Source Han Sans CN Regular";
  margin-top: 1.5vh;
  .virtualman {
    width: 30vh;
    height: 30vh;
    margin: 2.5vh auto 1vh;
    border-radius: 5%;
    border: 3px solid rgba(84, 115, 232, 0.2);
    text-align: center;
    background-image: url('@/assets/friend.png');
    background-size: cover;
  }

  .chat {
    width: 93vw;
    height: 80vh;
    border-radius: 5%;
    box-sizing: border-box;
    // 在此留出发送框
    padding: 0 0 7vh 0;
    background-color: #F3F3F4;
    margin: 0 auto;
    text-align: center;
    position: relative;

    .chatboxs {
      overflow-y: auto;
      width: 93vw;
      height: 80vh-6vh;
    }

    .chatboxs::-webkit-scrollbar {
      display: none;
    }

    .typein {
      position: absolute;
      bottom: 1vh;
      width: 78vw;
      height: 4.5vh;
      margin: 0 auto;
      left: -1vw;
    }

    .button {
      position: absolute;
      bottom: 1.2vh;
      right: 2.5vw;
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