<template>
    <Header title="大海" />
    <div class="ocean">
        <!-- 动画播放框 -->
        <div class="ocean-animation">
            <img src="@/assets/dbottle_ocean.png" width="100%" />
        </div>

        <!-- 按钮 -->
        <div class="button">
            <van-button type="primary" size="small" color="#5473E8" @click="throwBottle"
                class="button-send">发出漂流瓶</van-button>
            <van-button type="primary" plain size="small" color="#5473E8" @click="getBottle"
                class="button-recv">接收漂流瓶</van-button>
        </div>

    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router';
import { showDialog, showToast } from 'vant';
import 'vant/es/dialog/style';
import { DriftControllerService } from '@/generated';

const router = useRouter()

// 扔瓶子
const throwBottle = () => {
    router.push('/throwbottle')
}

// 打捞函数
const getBottle = async () => {
    // 展示动画

    // 打捞
    let res;
    try {
        res = await DriftControllerService.pickBottleUsingGet()
        if (res.code == 0) {
            // 成功
            showDialog({
                message: '打捞成功，快去我收到的漂流瓶看看吧！',
            }).then(() => {
                // 返回
                router.replace('/dbottles/recvlist')
            });
        } else {
            throw (res.message)
        }
    } catch (e) {
        showToast('捞起失败' + e)
    }



}
</script>

<style scoped lang="less">
.ocean {
    text-align: center;
    font-family: "Source Han Sans CN Regular";

    .ocean-animation {
        width: 95vw;
        margin: 3vh auto;
    }

    .button {
        --van-button-small-height: 4.5vh;
        margin-top: 10vh;

        .button-send {
            padding: 0 5vw;
            margin: 0 25px 0 20px;
            font-size: 10px;
        }

        .button-recv {
            padding: 0 5vw;
            margin: 0 20px 0 25px;
            font-size: 10px;

        }
    }
}
</style>