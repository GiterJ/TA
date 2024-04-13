<template>
  <Header title="发出漂流瓶" />
  <div class="throw">
    <div class="input-box">
      <div class="header">在这里写下你的心事</div>
      <van-cell-group inset>
        <van-field v-model="text" rows="2" label="" type="textarea" maxlength="500" placeholder="请输入"
          :autosize="{ maxHeight: 120, minHeight: 120 }" class="textarea" />
      </van-cell-group>
    </div>
    <div class="button">
      <van-button type="success" @click="onClickSend" color="#5473E8" size="small" style="padding: 0 40px;">发 送</van-button>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { showDialog, showToast } from 'vant';
import 'vant/es/dialog/style';
import { DriftControllerService } from '@/generated';
import { ref } from 'vue';

// 漂流瓶内容text
const text = ref("")


// 发送事件
const onClickSend = async () => {
  let res;
  try {
    res = await DriftControllerService.addBottleUsingPost({ content: text.value })
    if (res.code == 0) {
      showToast('发送成功')
    }
    else {
      throw (res.message)
    }
  } catch (e) {
    showToast("发送失败" + e)
  }
}

</script>

<style scoped lang="less">
.throw {
  .input-box {
    width: 83vw;
    height: 190px;
    background-color: #f3f3f4;
    border-radius: 20px;
    margin: 4vh auto;
    padding: 15px 0 0 0;
    font-family: "Source Han Sans CN Regular";

    .header {
      text-align: center;
      color: #5473E8;
      font-family: 'SourceHanSansCN-Bold';
      font-weight: bold;
      font-size: 12px;
      margin-bottom: 5px;
    }

    .textarea {
      background-color: #F3F3F4;
      --van-field-input-text-color: #999999;
    }
  }

  .button {
    text-align: center;
    --van-button-small-height: 30px;
    --van-button-small-font-size: 11px;
  }
}

</style>