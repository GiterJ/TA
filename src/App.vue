<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { UserControllerService } from '@/generated/services/UserControllerService'
import { AiPersonInfoControllerService } from './generated';
import { AiConsultantControllerService } from './generated';
import { useNavStore } from './stores/nav';
import useCosStore from './stores/cos';
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import { showToast, showConfirmDialog } from 'vant';
import useUserInfoStore from './stores/userinfo';
import { DriftControllerService } from './generated';
import useBottleStore from './stores/bottle';
import { AiCompanyControllerService } from './generated';
import { nextTick } from 'vue';
import useAichatStore from './stores/aichat';

const router = useRouter();
const NavStore = useNavStore();
const UserInfoStore = useUserInfoStore();
const CosStroe = useCosStore()
const BottleStore = useBottleStore()
const AichatStore = useAichatStore()

// 路由拦截，需要先进行登录
router.beforeEach(async (to, from, next) => {
  // 自动登录逻辑
  if (to.name === 'login') {
    try {
      // 获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet()
      if (res.code === 0) {
        // 更新用户信息
        UserInfoStore.userinfo.userAvatar = res.data.userAvatar;
        UserInfoStore.userinfo.userName = res.data.userName;
        UserInfoStore.userinfo.id = res.data.id;
        next('/seeuindex')
      } else {
        next()
      }
    } catch (err) {
      console.log(err)
      showToast("自动登录失败，服务器或网络问题")
      next()
    }
  }
  else {
    next()
  }

  // 底部导航对应逻辑
  if (/\/seeuindex.*/.test(to.path)) {
    NavStore.active = 0;
  } else if (/\/me.*/.test(to.path)) {
    NavStore.active = 3;
  } else if (/\/dbottles/.test(to.path)) {
    NavStore.active = 2;
  } else {
    NavStore.active = 1;
  }


  // 剩余次数逻辑
  if (to.path == '/seeuindex') {
    try {
      let res = await UserControllerService.getUseTimesUsingGet(UserInfoStore.userinfo.id)
      UserInfoStore.userinfo.restTime = res.data;
    } catch (e) {
      showToast('请求剩余次数失败' + e)
    }
  }

  // 生成状态逻辑
  if (to.path == '/seeuready') {
    try {
      let res = await AiPersonInfoControllerService.getStatusUsingGet(UserInfoStore.userinfo.messageid)
      if (res.code == 0) {
        UserInfoStore.userinfo.aiStatus = res.data.status
        UserInfoStore.userinfo.aiType = res.data.task
        // 判断是语音还是音频
        if (res.data.status == "生成成功") {
          if (res.data.task == "video") {
            UserInfoStore.userinfo.aiStillUrl = CosStroe.getUrl(res.data.execMessage)
          }
        }
      } else {
        throw (res.message)
      }
    } catch (e) {
      showToast('请求剩余次数失败' + e)
    }
  }


  if (to.name == 'seeuupload' || to.name == 'seeuuploadvoice') {
    showConfirmDialog({
      title: '确认',
      message:
        '点击进入代表您授权该功能使用TA的图像及声音信息，我们承诺将对上传的信息做好保护，不会用作其他用途。若同意请点击确认',
    })
      .then()
      .catch(() => {
        showToast('取消授权')
        router.back()
      });
  }


  // AI小伴开始逻辑
  if (to.name == 'friend') {
    // 未开启对话，则需要开启一轮新对话
    NavStore.accompanyactive = 0
    if (UserInfoStore.userinfo.chatCompanyID == "") {
      let res;
      try {
        res = await AiCompanyControllerService.startChatUsingPost()
        if (res.code == 0) {
          UserInfoStore.userinfo.chatCompanyID = res.data;
        } else {
          throw (res.message)
        }
      } catch (e) {
        showToast('发起对话失败' + e)
      }
    }
    else {
      let res;
      try {
        res = await AiCompanyControllerService.getHistoryMessageUsingGet(UserInfoStore.userinfo.chatCompanyID)
        if (res.code == 0) {
          AichatStore.accompanyFrientHistory = res.data
        } else {
          throw (res.message)
        }
      } catch (e) {
        showToast('获取记录失败' + e)
      }
    }
  }

  // AI心理咨询开始逻辑
  if (to.name == 'consultation') {
    // 未开启对话，则需要开启一轮新对话
    NavStore.accompanyactive = 1
    if (UserInfoStore.userinfo.chatConsultationID == "") {
      let res;
      try {
        res = await AiConsultantControllerService.startChatUsingPost1()
        if (res.code == 0) {
          UserInfoStore.userinfo.chatConsultationID = res.data;
        } else {
          throw (res.message)
        }
      } catch (e) {
        showToast('发起对话失败' + e)
      }
    } else {
      let res;
      try {
        console.log(UserInfoStore.userinfo.chatConsultationID)
        res = await AiCompanyControllerService.getHistoryMessageUsingGet(UserInfoStore.userinfo.chatConsultationID)
        if (res.code == 0) {
          AichatStore.accompanyConsultationHistory = res.data
        } else {
          throw (res.message)
        }
      } catch (e) {
        showToast('获取记录失败' + e)
      }
    }
  }

  // 实时头像url更新
  if (to.path == '/me') {
    if (UserInfoStore.userinfo.userAvatar == "") {
      UserInfoStore.userinfo.userAvatarUrl = "@/assets/logo.png"
    }
    // 如果没有上传过avatar，则使用默认头像 
    else {
      UserInfoStore.userinfo.userAvatarUrl = CosStroe.getUrl(UserInfoStore.userinfo.userAvatar)
    }
  }

  // 去往sendlist
  if (to.name == 'sendlist') {
    // 被捞起的和未被捞起的
    let resCatched;
    let resUncatched;
    NavStore.bottleactive = 0
    try {
      // 被捞起的
      resCatched = await DriftControllerService.listMyBottleVoByPageUsingPost({
        userId: UserInfoStore.userinfo.id,
        isPick: 1
      })
      // 请求成功
      if (resCatched.code == 0) {
        BottleStore.bottleListSendCatched = resCatched.data.records
      } else {
        throw (resCatched.message)
      }
      // 未被捞起的
      resUncatched = await DriftControllerService.listMyBottleVoByPageUsingPost({
        userId: UserInfoStore.userinfo.id,
        isPick: 0
      })
      // 请求成功
      if (resUncatched.code == 0) {
        BottleStore.bottleListSendUncatched = resUncatched.data.records
      } else {
        throw (resUncatched.message)
      }
    } catch (e) {
      showToast("请求已发送消息列表失败" + e)
    }
    next()
  }

  if (to.name == 'recvlist') {
    let res;
    NavStore.bottleactive = 1
    try {
      console.log(UserInfoStore.userinfo.id);
      res = await DriftControllerService.listMyBottleVoByPageUsingPost({
        pickUserId: UserInfoStore.userinfo.id
      })
      // 请求成功
      if (res.code == 0) {
        console.log(res.data.records);
        BottleStore.bottleListRecv = res.data.records
        console.log(BottleStore.bottleListRecv)
      } else {
        throw (res.message)
      }
    } catch (e) {
      showToast("请求已捞起列表失败" + e)
    }
  }

  // 权限申请
  let permissions = cordova.plugins.permissions;
  if (to.path === '/seeumain' || to.path === '/seeumainvoice') {
    // 检查权限
    permissions.hasPermission(permissions.RECORD_AUDIO, function (status) {
      if (status.hasPermission) {
        // 拥有权限，可以进入
        return true
      }
      else {
        // 没有权限则申请权限
        permissions.requestPermission(permissions.RECORD_AUDIO,
          () => {
            return true
          },
          () => {
            alert('获取权限失败')
            return false
          });
      }
    });
  }

})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>