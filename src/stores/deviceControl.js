import { defineStore } from "pinia";
import { reactive } from "vue";


const useDeviceStore = defineStore('device', () => {
    const deviceinfo = reactive({
        keyboard: false
    })

    return { deviceinfo }
})


export default useDeviceStore;