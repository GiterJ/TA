<template>
    <div class="seeuready">
        <!-- <div class="header">点击下方按钮开启对话</div> -->
        <div class="button" @click="startSeeu">
            <div class="button2">
                <div class="button3">
                    <div class="button4">
                        <div class="button5">
                            <div class="button6">{{ buttonContent }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="status-icon">
            <van-loading v-if="UserInfoStore.userinfo.aiStatus == '生成中'" color="rgba(84, 115, 232, 0.3)" size="24" />
            <van-icon v-else-if="UserInfoStore.userinfo.aiStatus == '生成失败'" name="fail" color="red" size="24" />
            <van-icon v-else-if="UserInfoStore.userinfo.aiStatus == '生成成功'" name="success" color="green" size="24" />
            <van-icon v-else name="circle" color="rgba(84, 115, 232, 0.3)" size="24" />
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import useUserInfoStore from '@/stores/userinfo';
import { AiPersonInfoControllerService } from '@/generated';
import { showToast } from 'vant';
import { watchEffect, ref } from 'vue';

const UserInfoStore = useUserInfoStore()
const buttonContent = ref("与TA见面")

watchEffect(() => {
    if (UserInfoStore.userinfo.aiStatus == "生成成功") {
        buttonContent.value = "与TA见面"
    } else {
        buttonContent.value = UserInfoStore.userinfo.aiStatus
    }
})

const startSeeu = () => {
    if (UserInfoStore.userinfo.aiStatus == "生成成功") {
        if (UserInfoStore.userinfo.aiType == "video") {
            router.push({
                path: '/seeumain',
                query: UserInfoStore.userinfo.aiName
            })
        }else{
            router.push({
                path: '/seeumainvoice',
                query: UserInfoStore.userinfo.aiName
            })
        }
    } else if (UserInfoStore.userinfo.aiStatus == "生成失败") {
        showToast('生成失败，请重新填写信息生成')
        // 重置messageid
        UserInfoStore.userinfo.messageid = ""
    } else {
        showToast('请等待生成')
    }
}

</script>

<style scoped lang="less">
.seeuready {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    width: 100vw;
    height: 100vh;
    font-family: "Source Han Sans CN Regular";

    .header {
        text-align: center;
        margin: 10px 0;
    }

    .button {
        background-color: rgba(84, 115, 232, 0.02);
        width: 90vw;
        height: 90vw;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .button2 {
            background-color: rgba(84, 115, 232, 0.05);
            width: 67vw;
            height: 67vw;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            .button3 {
                background-color: rgba(84, 115, 232, 0.1);
                width: 55vw;
                height: 55vw;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;

                .button4 {
                    background-color: rgba(84, 115, 232, 0.2);
                    width: 45vw;
                    height: 45vw;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .button5 {
                        background-color: rgba(84, 115, 232, 0.3);
                        width: 37vw;
                        height: 37vw;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .button6 {
                            background-color: #5473E8;
                            width: 30vw;
                            height: 30vw;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fff;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }

    .status-icon {
        margin: 0 auto;
    }

    .refresh-status {
        margin: 5px auto;
        text-align: center;
        width: 2vw;
        height: 5vh;
        font-size: 10px;
        color: red;
    }
}
</style>