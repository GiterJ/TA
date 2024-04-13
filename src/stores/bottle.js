import { defineStore } from "pinia";
import { reactive } from "vue";


const useBottleStore = defineStore('bottle', () => {
    const bottleListSendUncatched = reactive([]);
    const bottleListSendCatched = reactive([]);
    const bottleListRecv = reactive([]);

    // 用于从返回的records中提取关键信息
    const processRecords = (records, list) => {
        list.value = []
        records.forEach(e => {
            list.value.push({
                bottleId: e.id, // 瓶子id
                content: e.content,    // 内容
                userId: e.userId,      // 发送瓶子人id
                userAvatar: e.userAvatar,//发瓶人头像
                userName: e.userName,   // 发瓶人名称
                pickUserId: e.pickUserId,// 捞瓶人id
                pickUserAvatar: e.pickUserAvatar,// 捞瓶人头像
                pickUserName: e.pickUserName    // 捞瓶人名称
            })
        });
        return list
    }
    
    // [
    //     {
    //         "comments": [
    //             {
    //                 "bottleId": 0,
    //                 "createTime": "",
    //                 "detail": "",
    //                 "id": 0,
    //                 "parentId": 0,
    //                 "replyUserAvatar": "",
    //                 "replyUserId": 0,
    //                 "replyUserName": "",
    //                 "userAvatar": "",
    //                 "userId": 0,
    //                 "userName": ""
    //             }
    //         ],
    //         "content": "",
    //         "createTime": "",
    //         "id": 0,
    //         "isPick": 0,
    //         "pickUserId": 0,
    //         "userId": 0
    //     }
    // ]

    return { bottleListSendCatched, bottleListSendUncatched, bottleListRecv, processRecords }
})


export default useBottleStore;