<template>
    <Header title="形式选择" />
    <div class="buttons">
        <div class="button1" @click="enterVideo">
            <div class="text">
                视频
            </div>
        </div>
        <div class="button2" @click="enterVoice">
            <div class="text">
                语音
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()

const enterVideo = () => {
    router.push('/seeuupload')
}


const enterVoice = () => {
    router.push('/seeuuploadvoice')
}

</script>

<style scoped lang="less">
.buttons {
    margin: 0 auto;
    height: 80vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button1 {
        width: 30vw;
        height: 30vw;
        border-radius: 15vw;
        background-color: #5473E8;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        box-shadow: 0px 0px 40px 2px #5473e8
    }

    .button2 {
        width: 30vw;
        height: 30vw;
        border-radius: 15vw;
        background-color: #5473E8;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        box-shadow: 0px 0px 40px 2px #5473e8
    }
}
</style>