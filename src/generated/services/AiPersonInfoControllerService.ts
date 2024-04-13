/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AIPersonInfoAddRequest } from '../models/AIPersonInfoAddRequest';
import type { AIPersonInfoEditRequest } from '../models/AIPersonInfoEditRequest';
import type { AIPersonInfoQueryRequest } from '../models/AIPersonInfoQueryRequest';
import type { AIPersonInfoUpdateRequest } from '../models/AIPersonInfoUpdateRequest';
import type { BaseResponse_AIPersonInfo_ } from '../models/BaseResponse_AIPersonInfo_';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_AIPersonInfo_ } from '../models/BaseResponse_Page_AIPersonInfo_';
import type { BaseResponse_StatusResponse_ } from '../models/BaseResponse_StatusResponse_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { GenAIRequest } from '../models/GenAIRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AiPersonInfoControllerService {
    /**
     * addAIPersonInfo
     * @param aiPersonInfoAddRequest AIPersonInfoAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addAiPersonInfoUsingPost(
        aiPersonInfoAddRequest: AIPersonInfoAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiPerson/add',
            body: aiPersonInfoAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteAIPersonInfo
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteAiPersonInfoUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiPerson/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * editAIPersonInfo
     * @param aiPersonInfoEditRequest AIPersonInfoEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editAiPersonInfoUsingPost(
        aiPersonInfoEditRequest: AIPersonInfoEditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiPerson/edit',
            body: aiPersonInfoEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getAIPersonInfoVOById
     * @param id id
     * @returns BaseResponse_AIPersonInfo_ OK
     * @throws ApiError
     */
    public static getAiPersonInfoVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_AIPersonInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/aiPerson/get',
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
     * getStatus
     * @param id id
     * @returns BaseResponse_StatusResponse_ OK
     * @throws ApiError
     */
    public static getStatusUsingGet(
        id: number,
    ): CancelablePromise<BaseResponse_StatusResponse_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/aiPerson/getStatus',
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
     * listAIPersonInfoVOByPage
     * @param aiPersonInfoQueryRequest AIPersonInfoQueryRequest
     * @returns BaseResponse_Page_AIPersonInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listAiPersonInfoVoByPageUsingPost(
        aiPersonInfoQueryRequest: AIPersonInfoQueryRequest,
    ): CancelablePromise<BaseResponse_Page_AIPersonInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiPerson/list/page',
            body: aiPersonInfoQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * closeMessage
     * @param messageId messageId
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static closeMessageUsingGet(
        messageId: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/aiPerson/message/close',
            query: {
                'messageId': messageId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getNowMessageId
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static getNowMessageIdUsingGet(): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/aiPerson/message/getId',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyAIPersonInfoVOByPage
     * @param aiPersonInfoQueryRequest AIPersonInfoQueryRequest
     * @returns BaseResponse_Page_AIPersonInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyAiPersonInfoVoByPageUsingPost(
        aiPersonInfoQueryRequest: AIPersonInfoQueryRequest,
    ): CancelablePromise<BaseResponse_Page_AIPersonInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiPerson/my/list/page',
            body: aiPersonInfoQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * preGenerator
     * @param genAiRequest genAIRequest
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static preGeneratorUsingPost(
        genAiRequest: GenAIRequest,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiPerson/preGenerator',
            body: genAiRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateAIPersonInfo
     * @param aiPersonInfoUpdateRequest AIPersonInfoUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateAiPersonInfoUsingPost(
        aiPersonInfoUpdateRequest: AIPersonInfoUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/aiPerson/update',
            body: aiPersonInfoUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
