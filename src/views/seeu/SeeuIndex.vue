<template>
    <van-nav-bar title="再见一面" style="background-color: #F2F5FF; font-family: 'Source Han Sans CN';" />
    <div class="seeuindex-content">

        <!-- 使用方法及说明 -->
        <div class="claim">
            <span>使用方法</span><br />
            <div style="font-weight: normal; text-align: left; font-size: ">
                1. 再见一面模块提供模拟与亲人见面的功能。在该模块中，您可以与另一个世界的TA开始一场跨越时空的对话，无论是想弥补遗憾，还是想再说说话，或是想寄托思念，在这里都能实现。<br /><br />
                2.该模块有语音和视频两种方式，视频方式需要上传亲人正脸照片和亲人录音或视频，语音方式只需要上传亲人录音或视频。视频方式与微信视频类似，将可以与TA面对面聊天，但回复稍慢；语音方式只能听到TA的声音，但回复会更快。<br /><br />
                3. 进入后您将先选择交流类型，然后需要上传音频、图像。上传后请等待模型生成，该过程约需5分钟。<br /><br />
                4. 模型生成结束后，您即可进入与TA见面。该功能限时10分钟，每人限两次使用。<br /><br />
            </div>

            <span>使用声明</span><br />
            <div style="font-weight: normal; text-align-last: left;">
                1. 进入代表您同意以这种方式使用TA的声音和图像，请您谨慎思考后使用！<br /><br />
                2. 若TA曾表达不希望自己的声音或图像被用于此，请您尊重TA的意愿！<br /><br />
            </div>


            <div style="text-align-last: left; color:#5473E8">
                <br />世间何事最无常，花开花落总有时。希望您能通过这次对话弥补遗憾，寄托思念，获得温情，给您的生活带来力量！
            </div>
        </div>

        <!-- 剩余次数 -->
        <div class="rest-times">
            剩余次数：<span>{{ UserInfoStore.userinfo.restTime }}次</span>
        </div>

        <!-- 开始按钮 -->
        <div class="confirm">
            <van-button type="default" @click="enterSeeu">开启再见一面</van-button>
        </div>

    </div>
    <NavFooter />
</template>

<script setup>
import NavFooter from '@/components/NavFooter.vue';
import { useRouter } from 'vue-router';
import useUserInfoStore from '@/stores/userinfo';
import { ref, reactive } from 'vue';
import { AiPersonInfoControllerService } from '@/generated';
import { showToast } from 'vant';

const router = useRouter()
const UserInfoStore = useUserInfoStore()

const enterSeeu = async () => {
    // 在此修改，每次进入时判断是否有正在生成的数字人，如果有，直接进入即可
    // 另外，在挂断处添加关闭逻辑。倒计时后直接挂断
    let res;
    try {
        res = await AiPersonInfoControllerService.getNowMessageIdUsingGet()
        if (res.code == 0) {
            UserInfoStore.userinfo.messageid = res.data
            router.push('/seeuready')
            return
        } else if (res.code == 40400) {
            router.push('/seeutypechoose')
            return
        } else {
            throw (res.message)
        }
    } catch (e) {
        showToast('查询数字人id失败', e)
    }
}
</script>

<style scoped lang="less">
.seeuindex-content {
    text-align: center;
    font-family: "Source Han Sans CN Regular";

    .claim {
        width: 82vw;
        height: 60vh;
        font-family: "Source Han Sans CN Regular";
        font-weight: bold;
        box-sizing: border-box;
        padding: 2vh 5vw;
        border-radius: 2.6vw;
        margin: 5vh auto 0px;
        overflow-y: auto;
        background: #F3F3F4;
    }


    .claim::-webkit-scrollbar {
        display: none;
    }

    .rest-times {
        margin-top: 8vw;
        font-size: 3.7vw;
        font-family: "Source Han Sans CN Regular";

        span {
            color: #5473E8;
            font-weight: 700;
        }
    }

    .confirm {
        margin-top: 3.9vw;
        font-family: "Source Han Sans CN Regular";
        --van-button-default-background: #5473E8;
        --van-button-normal-font-size: 3vw;
        --van-button-default-color: white;
        font-weight: bold;
        --van-button-normal-padding: 0px 20px;
        --van-button-default-height: 4.5vh;
    }
}
</style>