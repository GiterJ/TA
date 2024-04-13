/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AIChatRequest } from '../models/AIChatRequest';
import type { BaseResponse_AIChatResponse_ } from '../models/BaseResponse_AIChatResponse_';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AiConsultantControllerService {
    /**
     * chat
     * @param aiChatRequest aiChatRequest
     * @returns BaseResponse_AIChatResponse_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static chatUsingPost1(
        aiChatRequest: AIChatRequest,
    ): CancelablePromise<BaseResponse_AIChatResponse_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/consultant/chat',
            body: aiChatRequest,
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
    public static startChatUsingPost1(): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/consultant/start',
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
    public static stopChatUsingPost1(
        chatId: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/consultant/stop',
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
