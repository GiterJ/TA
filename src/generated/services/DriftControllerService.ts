/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_BottleCommentVO_ } from '../models/BaseResponse_BottleCommentVO_';
import type { BaseResponse_BottleVO_ } from '../models/BaseResponse_BottleVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_BottleVO_ } from '../models/BaseResponse_Page_BottleVO_';
import type { BottleAddRequest } from '../models/BottleAddRequest';
import type { BottleCommentRequest } from '../models/BottleCommentRequest';
import type { BottleQueryRequest } from '../models/BottleQueryRequest';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DriftControllerService {
    /**
     * addBottle
     * @param bottleAddRequest bottleAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addBottleUsingPost(
        bottleAddRequest: BottleAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/drift/add',
            body: bottleAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * commentBottle
     * @param bottleCommentRequest bottleCommentRequest
     * @returns BaseResponse_BottleCommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static commentBottleUsingPost(
        bottleCommentRequest: BottleCommentRequest,
    ): CancelablePromise<BaseResponse_BottleCommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/drift/comment',
            body: bottleCommentRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteBottle
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteBottleUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/drift/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getBottleVOById
     * @param id id
     * @returns BaseResponse_BottleVO_ OK
     * @throws ApiError
     */
    public static getBottleVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_BottleVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/drift/get/vo',
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
     * listMyBottleVOByPage
     * @param bottleQueryRequest bottleQueryRequest
     * @returns BaseResponse_Page_BottleVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyBottleVoByPageUsingPost(
        bottleQueryRequest: BottleQueryRequest,
    ): CancelablePromise<BaseResponse_Page_BottleVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/drift/my/list/page/vo',
            body: bottleQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * pickBottle
     * @returns BaseResponse_BottleVO_ OK
     * @throws ApiError
     */
    public static pickBottleUsingGet(): CancelablePromise<BaseResponse_BottleVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/drift/pick',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
