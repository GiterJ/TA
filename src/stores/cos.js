import { defineStore } from "pinia";
import COS from "cos-js-sdk-v5";

const useCosStore = defineStore('cosstore', () => {
    // 创建COS对象时必须传入getAuthorization函数，每次调用cos方法时都通过该函数获得密钥
    // 或者通过以下方式放入静态密钥
    var cos = new COS({
        SecretId: '',
        SecretKey: '',
    });
    
    // 获取函数
    const getUrl = (key) => {
        let res = cos.getObjectUrl({
            Bucket: "",
            Region: "",
            Key: key
        })
        return res;
    }

    return { cos, getUrl }
})



export default useCosStore;