import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import seeu_active from '../assets/seeu_active.png'
import seeu_deactive from '../assets/seeu_deactive.png'
import aiconsult_active from '../assets/aiconsult_active.png'
import aiconsult_deactive from '../assets/aiconsult_deactive.png'
import dbottle_active from '../assets/dbottle_active.png'
import dbottle_deactive from '../assets/dbottle_deactive.png'
import me_active from '../assets/me_active.png'
import me_deactive from '../assets/me_deactive.png'

export const useNavStore = defineStore('nav', () => {
  // 底部导航栏活跃位置
  const active = ref(0)

  // AI陪伴顶部功能切换栏活跃位置
  const accompanyactive = ref(0)

  // 心声漂流瓶活跃状态栏位置
  const bottleactive = ref(0)


  // 导航栏相关配置
  const navDatas = [
    {
      index: 0,
      name: "再见一面",
      to: "/seeuindex",
      active: seeu_active,
      // active: "https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png",
      deactive: seeu_deactive
    },
    {
      index: 1,
      name: "AI咨询",
      to: "/accompany",
      active: aiconsult_active,
      deactive: aiconsult_deactive
    },
    {
      index: 2,
      name: "心声漂流瓶",
      to: "/dbottles",
      active: dbottle_active,
      deactive: dbottle_deactive
    },
    {
      index: 3,
      name: "我的",
      to: "/me",
      active: me_active,
      deactive: me_deactive
    },
  ]
  return { active, accompanyactive, bottleactive, navDatas }
})
