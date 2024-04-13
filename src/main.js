import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPersist from 'pinia-plugin-persistedstate'
// import '@/assets/font.css'
import axios from 'axios'
// import './mock/index'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)

app.use(router)
app.use(pinia)
app.mount('#app')

const onDeviceReady = () => {
    if (window.cordova && window.cordova.plugins) {
        window.StatusBar.overlaysWebView(false); // 是否覆盖webview,如果覆盖需要做相应的样式处理
        // window.StatusBar.backgroundColorByHexString('#33ffc400');
        // StatusBar.backgroundColorByHexString("#33ffc400");
        // window.StatusBar.hide();
    }
}

document.addEventListener("deviceready", onDeviceReady, false)