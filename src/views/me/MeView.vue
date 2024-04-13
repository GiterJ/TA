<template>
    <!-- 我的页面 -->
    <van-nav-bar title="我的" style="background-color: #F2F5FF;" />
    <div class="me">
        <!-- 个人信息展示区 -->
        <div class="show">
            <!-- 头像 -->
            <div class="image" :style="imageStyle"></div>
            <div class="names">
                <!-- 昵称 -->
                <div class="nickname">用户名：{{ UserInfoStore.userinfo.userName }}</div>
                <div class="useraccount">账号：{{ UserInfoStore.userinfo.userAccount }}</div>
            </div>
        </div>
        <!-- 分割线 -->
        <van-divider />
        <!-- 功能区 -->
        <div class="adjust">
            <van-list>
                <!-- 需要修改，现在点击每个都会退出登录 -->
                <van-cell v-for="item in list" :key="item" :title="item.title" @click="item.method" />
            </van-list>
        </div>
    </div>
    <NavFooter />
</template>

<script setup>
import NavFooter from '@/components/NavFooter.vue';
import Header from '@/components/Header.vue';
import { reactive, ref } from 'vue';
import 'vant/es/toast/style'
import { useRouter } from 'vue-router';
import useUserInfoStore from '@/stores/userinfo';
import { showToast } from 'vant';


// 从全局获取用户信息及操作函数
// userinfo=>username,userAvatar, user
const UserInfoStore = useUserInfoStore();
const router = useRouter()


const imageStyle = ref(`background-image: url(${UserInfoStore.userinfo.userAvatarUrl})`)

// 退出登录
const Logout = async () => {
    try {
        let res = await UserInfoStore.Logout()
        // 清空本地数据
        UserInfoStore.userinfo = reactive({
            id: "",    // id 用户唯一标识
            userAccount: "",    // 用户账号
            userName: "",   // 用户名
            userAvatar: "",  // 用户头像
            messageid: "",   // 对话message id
            restTime: 0,     // 剩余次数
            userAvatarUrl: "",
            chatCompanyID: "",      // ai小伴聊天id
            chatConsultationID: ""  // ai心理咨询师聊天id
        })
        showToast('退出成功！')
        router.replace('/login')
    } catch (err) {
        showToast(err)
    }
}

// 修改信息
const UpdateUserInfo = () => {
    router.push('/changeinfo')
}

const list = [
    {
        title: '修改信息',
        method: UpdateUserInfo
    },
    {
        title: '退出登录',
        method: Logout
    },
]




</script>


<style scoped lang="less">
.me {
    font-family: "Source Han Sans CN Regular";
    .show {
        margin: 10px auto;
        width: 90vw;
        height: 16vh;
        border-radius: 10%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        // border: 1px solid black;
        padding: 0 0 0 3.5vw;

        .image {
            border-radius: 50%;
            width: 55px;
            height: 55px;
            background-size: cover;
        }

        .names {
            flex: 1;
            text-align-last: left;
            padding: 0 0 0 5vw;

            .nickname {
                color: rgba(89, 118, 186, 1);
                font-weight: bold;
                font-size: 14px;
                margin-bottom: 5px;
            }

            .useraccount {
                color: rgba(153, 153, 153, 1);
                font-size: 10px;
            }
        }
    }
}
</style>