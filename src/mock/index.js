import Mock from 'mockjs'

// getLoginUser
Mock.mock('/api/user/get/login', 'get', () => {
    return {
        "code": 40000,
        "data": {
            "id": "1747538833097482242",
            "userName": "砚台",
            "userAvatar": "https://img.zcool.cn/community/01fec958158d43a84a0d304fc3c541.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100",
            "userProfile": "我是管理员",
            "userRole": "admin",
            "createTime": "2024-01-17T08:38:20.000+00:00",
            "updateTime": "2024-03-04T06:52:42.000+00:00"
        },
        "message": "ok"
    }
})

Mock.mock('/api/user/logout', 'post', () => {
    return {
        "code": 0,
        "data": true,
        "message": "ok"
    }
})

Mock.mock('/api/user/login', 'post', () => {
    return {
        "code": 0,
        "data": {
            "id": "1747538833097482242",
            "userName": "砚台",
            "userAvatar": "",
            "userProfile": "我是管理员",
            "userRole": "admin",
            "createTime": "2024-01-17T08:38:20.000+00:00",
            "updateTime": "2024-02-29T07:54:03.000+00:00"
        },
        "message": "ok"
    }
})

Mock.mock('/api/user/register', 'post', () => {
    return {
        "code": 0,
        "data": null,
        "message": "用户账号过短"
    }


})

Mock.mock('/api/aiPerson/preGenerator', 'post', () => {
    return {
        "code": 0,
        "data": "1765262208812982274",
        "message": "ok"
    }

})

Mock.mock(/\/api\/file\/upload.*/, 'post', () => {
    return {
        "code": 0,
        "data": "/user_avatar/1747538833097482242/aVTWVZyY-NARAKA BLADEPOINTScreenshot 2021.12.30 - 21.33.55.31.png", //文件在COS云存储中的Key
        "message": "ok"
    }

})
// get

Mock.mock('/api/generate/video', 'post', () => {
    return {
        "code": 0,
        "data": {
            "aiMessage": "你好呀，我的孙子。每次听到你的声音我都很开心",
            "aiVideoUrl": "/gen_video/1768284785706299394/2024-03-14 22:38:10.mp4",
            "aiVoiceUrl": "/gen_video/1768284785706299394/2024-03-14 22:38:10.mp4"
        },
        "message": ""
    }

})