<!-- 个人信息修改页面 -->

<template>
  <!-- 头部 -->
  <Header title="修改信息" />

  <!-- 修改信息页面内容 -->
  <div class="changeinfo">
    <!-- 头像 -->
    <div class="upload-img">
      <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" accept="image/*"/>
    </div>
    <!-- 用户名修改及提交按钮 -->
    <van-form>
      <van-cell-group inset>
        <van-field v-model="userinfo.userName" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" @click="ChangeInfo">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script setup>
import Header from '@/components/Header.vue'
import useUserInfoStore from '@/stores/userinfo';
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { FileControllerService } from '@/generated/services/FileControllerService'
import 'vant/es/toast/style'
import { showToast } from 'vant';

const UserInfoStore = useUserInfoStore()
const router = useRouter()

// 可以修改的用户信息
const userinfo = reactive({
  userName: "",
  userAvatar: ""
})

// uploader 的 v-model 绑定值
const fileList = ref([])



/**
 * 读取文件并上传到服务器桶中
 */
const afterRead = async (file) => {
  // 上传图片并获取桶路径
  let res;
  try {
    res = await FileControllerService.uploadFileUsingPost('user_avatar', file.file)
    if (res.code == 0) {
      showToast("头像文件上传成功")
      // 获取到url
      userinfo.userAvatar = res.data
    } else {
      showToast("头像文件上传失败" + res.message)
    }
  } catch (err) {
    console.log(err)
    showToast("文件上传失败！网络或服务器错误")
  }

}

/**
 * 提交回调函数，将信息上传到服务器并进行路由跳转
 */
const ChangeInfo = async () => {
  // 将信息上传到服务器
  if (userinfo.userAvatar != "" && userinfo.userName != "") {
    try {
      let res = await UserInfoStore.UpdateUserInfo(userinfo.userAvatar, userinfo.userName);
      UserInfoStore.userinfo.userName = userinfo.userName;
      UserInfoStore.userinfo.userAccount = userinfo.userAccount;
      showToast('修改成功！')
      router.replace('/seeuindex')
    } catch (err) {
      showToast(err)
    }
  } else {
    showToast("请填入完整信息")
  }
}





</script>

<style scoped lang="less">
.changeinfo {
  text-align: center;
  font-family: "Source Han Sans CN Regular";
}
</style>