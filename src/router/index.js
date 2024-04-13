import { createRouter, createWebHashHistory } from 'vue-router'
import AccompanyViewVue from '@/views/accompany/AccompanyView.vue'
import DbottlesViewVue from '@/views/dbottles/DbottlesView.vue'
import MeViewVue from '@/views/me/MeView.vue'
import SeeuIndexVue from '@/views/seeu/SeeuIndex.vue'
import SeeuUploadVue from '@/views/seeu/subviews/SeeuUpload.vue'
import SeeuReadyVue from '@/views/seeu/subviews/SeeuReady.vue'
import SeeuMainVue from '@/views/seeu/subviews/SeeuMain.vue'
import AccompanyFriendViewVue from '@/views/accompany/subviews/AccompanyFriendView.vue'
import AccompanyConsultationViewVue from '@/views/accompany/subviews/AccompanyConsultationView.vue'
import AccompanyTreatViewVue from '@/views/accompany/subviews/AccompanyTreatView.vue'
import AccompanyTreatChatViewVue from '@/views/accompany/subviews/AccompanyTreatChatView.vue'
import DbottleOceanViewVue from '@/views/dbottles/subviews/DbottleOceanView.vue'
import DbottleThrowViewVue from '@/views/dbottles/subviews/DbottleThrowView.vue'
import DbottleRecvListViewVue from '@/views/dbottles/subviews/DbottleRecvListView.vue'
import DbottleSendListViewVue from '@/views/dbottles/subviews/DbottleSendListView.vue'
import LoginViewVue from '@/views/me/login/LoginView.vue'
import RegisterViewVue from '@/views/me/register/RegisterView.vue'
import DbottleChatViewVue from '@/views/dbottles/subviews/DbottleChatView.vue'
import ChangeInfoViewVue from '@/views/me/subviews/ChangeInfoView.vue'
import SeeuMainVoice from '@/views/seeu/subviews/SeeuMainVoice.vue'
import SeeuUploadVoice from '@/views/seeu/subviews/SeeuUploadVoice.vue'
import SeeuTypeChoose from '@/views/seeu/subviews/SeeuTypeChoose.vue'

const router = createRouter({
  // 设置路由模式
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 配置路由项
  routes: [
    // 进入后直接定向到再见一面模块
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },

    // 再见一面进入前页面
    {
      path: '/seeuindex',
      name: 'seeu',
      component: SeeuIndexVue
    },
    {
      path: '/seeuupload',
      name: 'seeuupload',
      component: SeeuUploadVue
    },
    {
      path: '/seeuready',
      name: 'seeuready',
      component: SeeuReadyVue
    },
    {
      path: '/seeumain',
      name: 'seeumain',
      component: SeeuMainVue
    },
    {
      path: '/seeumainvoice',
      name: 'seeumainvoice',
      component: SeeuMainVoice
    },
    {
      path: '/seeuuploadvoice',
      name: 'seeuuploadvoice',
      component: SeeuUploadVoice
    },
    {
      path: '/seeutypechoose',
      name: 'seeutypechoose',
      component: SeeuTypeChoose
    },


    // “我的” 页面
    {
      path: '/me',
      name: 'me',
      component: MeViewVue
    },
    {
      path: '/changeinfo',
      name: 'changeinfo',
      component: ChangeInfoViewVue
    },

    // AI小伴，AI心理咨询及人工心理咨询整合页面
    {
      path: '/accompany',
      name: 'accompany',
      component: AccompanyViewVue,
      redirect: '/accompany/friend',
      children: [
        {
          path: 'friend',
          name: 'friend',
          component: AccompanyFriendViewVue
        },
        {
          path: 'consultation',
          name: 'consultation',
          component: AccompanyConsultationViewVue
        },
        {
          path: 'treat',
          name: 'treat',
          component: AccompanyTreatViewVue
        },
      ]
    },

    // treatchat治疗师对话页面
    {
      path: '/treatchat',
      name: 'treatchat',
      component: AccompanyTreatChatViewVue
    },

    // 漂流瓶页面
    {
      path: '/dbottles',
      name: 'dbottles',
      component: DbottlesViewVue,
      redirect: {
        name: 'sendlist'
      },
      children: [
        {
          path: 'sendlist',
          name: 'sendlist',
          component: DbottleSendListViewVue
        },
        {
          path: 'recvlist',
          name: 'recvlist',
          component: DbottleRecvListViewVue
        }
      ]
    },
    {
      path: '/ocean',
      name: 'oeacn',
      component: DbottleOceanViewVue
    },
    {
      path: '/throwbottle',
      name: 'throwbottle',
      component: DbottleThrowViewVue
    },
    {
      path: '/dbottlechat',
      name: 'dbottlechat',
      component: DbottleChatViewVue
    },

    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterViewVue
    }
  ]
})

export default router