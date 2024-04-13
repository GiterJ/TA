import { defineStore } from "pinia";
import { reactive, ref } from "vue";

const useAichatStore = defineStore('aichat', () => {
    const accompanyFrientHistory = ref("")
    const accompanyConsultationHistory = ref("")

    // 用于从返回的records中提取关键信息
    const processRecordsFriend = (data, list) => {
        list.value = []
        let i = 0
        let records = data.match(/"content":"(.*?)"/g).map(match => match.substring(11, match.length - 1));
        records.forEach(e => {
            // 不取第一个
            i = i + 1;
            if (i != 1 && i != 2) {
                // 如果是奇数
                if (i % 2 == 1) {
                    list.value.push({
                        text: e,
                        name: '我',
                        type: 'right',
                        avatar: ""
                    })
                }
                // 如果是偶数
                else {
                    list.value.push({
                        text: e,
                        name: '小伴',
                        type: 'left',
                        avatar: ""
                    })
                }
            }
        });
        return list
    }

    // 用于从返回的records中提取关键信息
    const processRecordsConsultation = (data, list) => {
        list.value = []
        let i = 0
        let records = data.match(/"content":"(.*?)"/g).map(match => match.substring(11, match.length - 1));
        records.forEach(e => {
            // 不取第一个
            i = i + 1;
            if (i != 1 && i != 2) {
                // 如果是奇数
                if (i % 2 == 1) {
                    list.value.push({
                        text: e,
                        name: '我',
                        type: 'right',
                        avatar: ""
                    })
                }
                // 如果是偶数
                else {
                    list.value.push({
                        text: e,
                        name: '心理咨询师',
                        type: 'left',
                        avatar: ""
                    })
                }
            }
        });
        return list
    }

    return { accompanyFrientHistory, accompanyConsultationHistory, processRecordsFriend, processRecordsConsultation }
})


export default useAichatStore;