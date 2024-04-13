<!-- 再见一面模块上传文件页面 -->
<!-- 提供图片、音频/视频、亲人描述上传接口 -->
<!-- props: null -->

<template>
  <!-- 头部 -->
  <Header title="文件上传" />

  <!-- 上传主体部分 -->
  <div class="seeuupload-content">

    <!-- 上传图片 -->
    <div class="text-img">&nbsp;&nbsp;上传照片
      <van-icon v-if="'img' in urls && urls['img'] != 'fail'" name="success" color="green" />
      <van-icon v-else-if="'img' in urls && urls['img'] == 'fail'" name="fail" color="red" />
      <van-icon v-else name="circle" color="#5473E8" />
    </div>
    <div class="img-uploader">
      <FileUploader type="img" :addUrl="addUrl" />
      <!-- 示例图片 -->
      <div class="img-demo">
        <div class="over-text">
          示&nbsp;例&nbsp;图&nbsp;片
        </div>
      </div>
    </div>

    <!-- 上传音频 -->
    <div class="text-img" style="margin-top: 5px">
      &nbsp;&nbsp;上传声音
      <van-icon v-if="voice_status == 'success'" name="success" color="green" />
      <van-icon v-else-if="voice_status == 'fail'" name="fail" color="red" />
      <van-icon v-else name="circle" color="#5473E8" />
    </div>
    <div class="voice-uploader">
      <div class="audio-uploader">
        <FileUploader type="unable" :addUrl="addUrl" v-if="audio_canupload" />
        <FileUploader type="audio" :addUrl="addUrl" v-else />
        <span style="font-size: 14px;">音频入口&nbsp;&nbsp;</span>
      </div>

      <!-- 上传视频 -->
      <div class="video-uploader">
        <FileUploader type="unable" :addUrl="addUrl" v-if="video_canupload" />
        <FileUploader type="video" :addUrl="addUrl" v-else />
        <span style="font-size: 14px;">视频入口&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>


    <!-- 上传描述 -->
    <div class="description-uploader">
      <van-cell-group inset>
        <van-field v-model="name" rows="2" autosize label="TA的称呼" type="input" placeholder="TA是你的谁?" show-word-limit />
        <div style="text-align:left; font-size:14px; padding: 0 16px; margin-top:5px;">描述</div>
        <div class="description-box">
          <van-field v-model="description" rows="2" label="" type="textarea" maxlength="500" placeholder="TA是一个什么样的人?"
            :autosize="{ maxHeight: 80, minHeight: 80 }" />
        </div>
      </van-cell-group>

    </div>

    <!-- 文件上传说明 -->
    <div class="notion">
      <span style="color: #CC2525; font-size: 13px">文件上传说明:<br /></span>
      <span style="color: #666666; font-size: 13px; font-weight: normal;">
        1. 图片文件尽量为正脸照，否则可能会生成模型失败。
        2.
        音频或视频文件选其一上传即可。建议选择声音质量较好的文件类型上传。音频或视频文件前10秒内必须要有TA的声音，且需要尽可能多的出现。否则可能会导致模型出现偏差，影响效果和成功率。对话过程中，语气将与给定音频/视频文件中TA的语气相同。
      </span>
    </div>

    <!-- 提交按钮 -->
    <van-button type="primary" @click="submitFiles" class="commit-button" color="#5473E8">
      提交
      <van-icon v-if="upload_status == 'success'" name="success" color="white" />
      <van-icon v-else name="circle" color="white" />
    </van-button>

  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import FileUploader from '../components/FileUploader.vue';
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import 'vant/es/dialog/style'
import { showToast, showDialog } from 'vant';
import { AiPersonInfoControllerService } from '@/generated';
import useUserInfoStore from '@/stores/userinfo';
import { showNotify, closeNotify } from 'vant';


const router = useRouter();
const description = ref("")
const name = ref("")
const UserInfoStore = useUserInfoStore()

// 上传的信息对象，当fileuploader中有信息上传时，会在其中添加对应url
// 如果有对应的key，说明上传过；如果没有key，说明待上传；如果value值为fail，说明上传过，但上传失败
const urls = ref({});  // img audio video

const submitFiles = async () => {
  // 校验音频和图片文件是否都有上传
  if (upload_status.value == 'success') {
    // 通过后进入下一步
    let res
    try {
      // 建立数字人信息
      res = await AiPersonInfoControllerService.preGeneratorUsingPost(
        {
          aiName: name.value,
          aiPicture: urls.value.img, //如果是只生成音频，那么就不需要上传，如果生成视频，比如生产
          aiProfile: description.value,
          aiVoice: ('audio' in urls.value) ? urls.value.audio : urls.value.video //必须上传的
        }
      )
      if (res.code == 0) {
        // 获取messeageid
        UserInfoStore.userinfo.messageid = res.data
        UserInfoStore.userinfo.aiName = name.value

        showDialog({
          title: '开始加载',
          message: '需要进行加载，请等待。过程耗时约5分钟，可点击进入再见一面查看加载状态'
        }).then(() => {
          router.replace({
            path: '/seeuindex'
          })
          showNotify({
            type: 'success',
            message: '开始加载'
          });
        })
        return;
      } else {
        throw (res.message)
      }
    } catch (err) {
      showToast('信息上传失败，网络或服务器问题', e)
    }
  } else {
    showToast('请上传完整信息')
  }
}

const addUrl = (key, value) => {
  urls.value[key] = value;
}

// 组件显示计算属性
const audio_canupload = computed(() => {
  return ('video' in urls.value && urls.value['video'] != 'fail');
})
const video_canupload = computed(() => {
  return ('audio' in urls.value && urls.value['audio'] != 'fail');
})
// 声音上传状态
const voice_status = computed(() => {
  // 未上传
  if (!('video' in urls.value || 'audio' in urls.value)) {
    return 'circle'
  }
  // 失败
  else if ('video' in urls.value && urls.value['video'] == 'fail' || 'audio' in urls.value && urls.value['audio'] == 'fail') {
    return 'fail'
  }
  // 成功
  else {
    return 'success'
  }
})
// 可提交状态
const upload_status = computed(() => {
  if ('img' in urls.value && urls.value['img'] != 'fail' && voice_status.value == 'success' && name.value != "" && description.value != "") {
    return 'success'
  } else {
    return 'circle'
  }
})


</script>

<style scoped lang="less">
.seeuupload-content {
  text-align: center;
  font-family: "Source Han Sans CN Regular";
  --van-notify-success-background: #7794FF;

  .text-img {
    margin-top: 20px;
    text-align: left;
    font-weight: 400;
    font-size: 4vw;
  }

  .img-uploader {
    margin-top: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .img-demo {
      background-image: url("../../../assets/demo_image.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      width: 35vw;
      height: 39vw;
      border-radius: 15px;
      display: flex;
      flex-direction: column-reverse;
      margin-right: 6px;

      .over-text {
        text-align: center;
        width: 35vw;
        height: 7vw;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        border-radius: 0 0 15px 15px;
        line-height: 7vw;
        font-size: 3.7vw;
      }
    }
  }

  .voice-uploader {
    display: flex;
    justify-content: center;
    margin-top: 5vw;

    .audio-uploader {
      text-align: center;
      // margin: 0 2.5vw 0 3.5vw;
      margin: 0 auto;
    }

    .video-uploader {
      text-align: center;
      margin: 0 auto;
    }
  }

  .description-uploader {
    .description-box {
      margin: 5px auto;
      width: 93vw;
      height: 28vw;
      background-color: #F3F3F4;
      border-radius: 8px;
    }
  }

  .notion {
    margin: 5px auto;
    padding: 4px 10px;
    text-align: left;
    width: 90vw;

  }

  .commit-button {
    margin: 0 0 8vh 0;
    --van-button-default-height: 8vw;
    --van-button-radius: 1.8vw;
    padding: 0 10vw;
  }
}


:deep(.van-field__label) {
  width: 60px;
}

:deep(.van-cell-group--inset) {
  margin: 0;
}

:deep(.van-cell) {
  background-color: transparent;
}
</style>