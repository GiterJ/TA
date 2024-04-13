<template>
  <van-list>
    <ChatItem v-for="(item, index) in doctorList" :key="index" :userName="item.doctorName"
      :userAvatar="item.doctorAvater" :text="item.doctorDescription" @click="startChat(item.doctorName)" />
  </van-list>
</template>

<script setup>
import { useRouter } from 'vue-router';

const doctorList = [
  {
    doctorName: '李医生',
    doctorAvater: '',
    doctorDescription: '尽职尽责的好医生，专注于哀伤治疗二十年'
  },
  {
    doctorName: '王医生',
    doctorAvater: '',
    doctorDescription: '尽职尽责的好医生，专注于哀伤治疗二十年'
  }
]
const router = useRouter()

const startChat = (doctorName) => {
  router.push({
    name: 'treatchat',
    query:{
      name: doctorName
    }
  })
}
</script>

<style scoped lang="less"></style>