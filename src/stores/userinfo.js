/**
 * 包含与用户相关的全局变量及与服务器对接的包装函数
 * 不包括路由跳转部分
 */
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';
import { UserControllerService } from '../generated/services/UserControllerService'

import 'vant/es/toast/style'
import { showToast } from 'vant';

const useUserInfoStore = defineStore('userinfo', () => {

    const userinfo = reactive({
        id: "",    // id 用户唯一标识
        userAccount: "",    // 用户账号
        userName: "",   // 用户名
        userAvatar: "",  // 用户头像
        messageid: "",   // 对话message id
        aiName: "",     // 数字人称呼
        aiStatus: "",   // 生成状态
        aiType: "",     // 数字人类型：voice/video
        aiStillUrl: "", // 空闲视频url
        restTime: 0,     // 剩余次数
        userAvatarUrl: "",
        chatCompanyID: "",      // ai小伴聊天id
        chatConsultationID: ""  // ai心理咨询师聊天id
    })

    /**
     * 用户操作封装函数，包含与服务器交互以及状态更新
     * @param {string} userAccount 用户账号
     * @param {string} userPassword 用户密码
     * @param {string} checkPassword 确认密码
     * @returns 失败抛出异常，使用catch捕获
     */
    const Register = async (userAccount, userPassword, checkPassword) => {
        // 构建参数
        const params = {
            "checkPassword": checkPassword,
            "userAccount": userAccount,
            "userPassword": userPassword
        }
        // 向服务器申请注册
        let res;
        try {
            res = await UserControllerService.userRegisterUsingPost(params)
            // 注册成功
            if (res.code === 0) {
                // 打印提示
                showToast('注册成功,即将自动登录')
                // 自动登录
                res = await UserControllerService.userLoginUsingPost({
                    "userAccount": userAccount,
                    "userPassword": userPassword
                })
                if (res.code === 0) {
                    showToast('自动登录成功！')
                    userinfo.id = res.data.id;
                    userinfo.userAccount = userAccount;
                    return;
                } else {
                    showToast('自动登录失败！' + res.message)
                    throw ('jump')
                }
            }
            // 注册失败
            else {
                // 打印提示信息，不进行路由跳转
                showToast('注册失败：' + res.message)
                throw ('jump')
            }
        }
        catch (err) {
            if (err !== 'jump') {
                showToast('注册失败：服务器或网络错误')
                throw ('注册失败：服务器或网络错误' + err)
            } else {
                throw (err)
            }
        }
    }

    /**
     * 用户登录
     * @param {string} userAccount 用户账号
     * @param {string} userPassword 用户密码
     * @returns 失败返回reject，使用catch捕获
     */
    const Login = async (userAccount, userPassword) => {
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
                userinfo.id = res.data.id;
                userinfo.userAccount = userAccount;
                userinfo.userAvatar = res.data.userAvatar;
                userinfo.userName = res.data.userName;
                console.log(userinfo.id)
                console.log(userinfo.userAccount)
                console.log(userinfo.userAvatar)
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

    /**
     * 用户登出，从服务器删除登录信息
     * @returns 失败返回reject，使用catch捕获
     */
    const Logout = async () => {
        let res;
        try {
            res = await UserControllerService.userLogoutUsingPost()
            if (res.code === 0) {
                // 清除本地信息
                userinfo.id = "";
                userinfo.userAccount = "";
                userinfo.userAvatar = "";
                userinfo.userName = "";
                userinfo.chatCompanyID = "";
                userinfo.chatConsultationID = "";
                userinfo.aiName = "";
                userinfo.aiStatus = "";
                userinfo.aiStillUrl = "";
                userinfo.aiType = "";
                return;
            }
            // 未登录就登出
            else {
                // 打印提示信息
                throw ('jump')
            }
        } catch (err) {
            if (err == 'jump') {
                throw ('退出失败！' + res.message)
            } else {
                throw ('退出失败！服务器或网络问题')
            }
        }
    }

    /**
     * 上传需要修改的信息
     * @param {string} userAvatar 用户头像url
     * @param {string} userName 用户名
     * @returns 失败返回reject，使用catch捕获
     */
    const UpdateUserInfo = async (userAvatar, userName) => {
        // 构造参数
        const params = {
            "userAvatar": userAvatar,
            "userName": userName,
            "userProfile": ""
        }
        let res;
        try {
            // 调用上传函数，并使用catch处理异常情况
            res = await UserControllerService.updateMyUserUsingPost(params)

            if (res.code === 0) {
                // 打印提示信息


                // 修改本地用户信息
                userinfo.userName = userName;
                userinfo.userAvatar = userAvatar;

                // 返回成功
                return;
            } else {
                throw ('jump')
            }
        } catch (err) {
            if (err == 'jump') {
                throw ('修改失败' + res.message)
            } else {
                throw ('修改失败，服务器或网络问题')
            }
        }
    }

    return { userinfo, Logout, UpdateUserInfo, Login, Register };
},
    {
        persist: true
    })

export default useUserInfoStore;