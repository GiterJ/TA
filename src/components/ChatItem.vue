<template>
    <div class="chat-item">
        <!-- 头像 -->
        <div class="img"></div>
        <!-- 用户名 -->
        <div class="name">{{ userName }}</div>
        <!-- 文字 -->
        <div class="text">
            <!-- <van-text-ellipsis rows="1" :content="text"/> -->
            {{ text }}
        </div>
        <van-divider class="line"/>
    </div>
</template>

<script setup>

const props = defineProps(['userAvatar', 'userName', 'text'])

</script>

<style scoped lang="less">
.chat-item {
    position: relative;
    box-sizing: border-box;
    padding: 10px 10px 0px 10px;
    width: 100vw;
    height: 70px;
    font-family: "Source Han Sans CN Regular";

    .img {
        position: absolute;
        // background-color: skyblue;
        background-image: url('@/assets/logo.png');
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 14px;
        left: 20px;
    }

    .name {
        position: absolute;
        top: 10px;
        left: 85px;
        color: #666666;
    }

    .text {
        position: absolute;
        bottom: 15px;
        left: 85px;
        font-size: 13px;
        color: #999999;
    }

    .line {
        margin-top: 58px;
    }
}
</style>