<template>
    <div class="heart-sound">
        <div class="header">漂流瓶心声</div>
        <div class="text">{{ content }}</div>
    </div>
</template>

<script setup>


const props = defineProps(['content'])
</script>

<style scoped lang="less">
.heart-sound {
    width: 82.4vw;
    min-height: 5vh;
    box-sizing: border-box;
    padding: 1vh 4.5vw;
    // border: 1px solid black;
    background-color: #F3F3F4;
    border-radius: 10px;
    .header {
        margin: 0 auto;
        text-align: center;
        color: #5473E8;
        font-family: 'SourceHanSansCN-Bold';
        font-weight: bold;
    }

    .text {
        text-align: left;
        margin:1vh 0;
        color: #666666;
    }
}
</style>