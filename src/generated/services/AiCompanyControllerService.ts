/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AIChatRequest } from '../models/AIChatRequest';
import type { BaseResponse_AIChatResponse_ } from '../models/BaseResponse_AIChatResponse_';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AiCompanyControllerService {
    /**
     * chat
     * @param aiChatRequest aiChatRequest
     * @returns BaseResponse_AIChatResponse_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static chatUsingPost(
        aiChatRequest: AIChatRequest,
    ): CancelablePromise<BaseResponse_AIChatResponse_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiCompany/chat',
            body: aiChatRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getHistoryMessage
     * @param id id
     * @returns BaseResponse_string_ OK
     * @throws ApiError
     */
    public static getHistoryMessageUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/aiCompany/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * startChat
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static startChatUsingPost(): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiCompany/start',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * stopChat
     * @param chatId chatId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static stopChatUsingPost(
        chatId: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiCompany/stop',
            query: {
                'chatId': chatId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
