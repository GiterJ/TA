<!-- 登录页面 -->

<template>
    <div class="login">
        <!-- 软件图标 -->
        <div class="img">
            <img src="../../../assets/logo.png">
            <span>TA</span>
        </div>

        <!-- 输入框 -->
        <div class="inputbox">
            <van-form>
                <van-cell-group inset>
                    <van-field v-model="userinfo.useraccount" name="账号" label="账号" placeholder="账号"
                        :rules="[{ required: true, message: '请填写账号' }]" />
                    <van-field v-model="userinfo.password" type="password" name="密码" label="密码" placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                </van-cell-group>
                <div class="login-button">
                    <van-button block type="primary" native-type="submit" @click="Login" color="#5473E8">
                        <span
                            style="font-family : 'SourceHanSansCN-Regular'">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</span>
                    </van-button>
                </div>
            </van-form>

        </div>

        <!-- 去注册 -->
        <div class="register">
            <RouterLink to="/register">去注册</RouterLink>
        </div>
    </div>
</template>

<script setup>
import useUserInfoStore from '@/stores/userinfo';
import 'vant/es/toast/style'
import { showToast } from 'vant';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { UserControllerService } from '@/generated';

const UserInfoStore = useUserInfoStore()
const router = useRouter()

// 输入框响应式数据
const userinfo = reactive({
    useraccount: "",
    password: ""
})

// 登录函数
const Login = async () => {
    try {
        let res = await Login_wrap(userinfo.useraccount, userinfo.password)
        showToast('登录成功！')
        router.replace('/seeuindex')
    } catch (err) {
        console.log(err)
        showToast(err)
    }
}

// 封装函数，由于在userinfo中直接修改内部变量失效才移动到此
const Login_wrap = async (userAccount, userPassword) => {
    // 用户登录信息参数构造
    const userinfotosend = {
        "userAccount": userAccount,
        "userPassword": userPassword
    }
    let res;
    try {
        // 发出登录请求
        res = await UserControllerService.userLoginUsingPost(userinfotosend)
        if (res.code == 0) {
            // 提示登录成功
            // 修改后台用户信息
            UserInfoStore.userinfo.id = res.data.id;
            UserInfoStore.userinfo.userAccount = userAccount;
            UserInfoStore.userinfo.userAvatar = res.data.userAvatar;
            UserInfoStore.userinfo.userName = res.data.userName;
            return;
        } else {
            // 使用toast轻提示打印message
            throw ('jump')
        }
    }
    catch (err) {
        if (err == 'jump') {
            throw ('登录失败！' + res.message)
        }
        else {
            throw ('登录失败！服务器或网络问题' + err)
        }
    }
}

</script>

<style scoped lang="less">
.login {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 21vh;
    font-family: "Source Han Sans CN Regular";


    .img {
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
            font-size: 6.5vw;
            margin: 4vw 0px 0px;
            font-family: Alibaba PuHuiTi;
            font-weight: bold;
            color: #5473E8;
        }

        img {
            width: 22.4vw;
        }
    }

    .inputbox {
        margin-top: 7vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .login-button {
            margin: 10vh auto 0px;
            --van-button-default-height: 4.8vh;
            --van-button-radius: 1.8vw;
            width: 80vw;
        }
    }

    .register {
        margin: 2.3vh auto 0px;

        a {
            text-decoration: none;
            font-size: 2vh;
            color: #3c55b1;
            font-family: 'Microsoft YaHei';

            &:visited {
                color: #5473E8;
                font-family: 'Microsoft YaHei';
            }
        }


    }
}
</style>