/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_GenVideoResponse_ } from '../models/BaseResponse_GenVideoResponse_';
import type { BaseResponse_GenVoiceResponse_ } from '../models/BaseResponse_GenVoiceResponse_';
import type { GenRequest } from '../models/GenRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AiGenerateControllerService {
    /**
     * generateVideoByText
     * @param genRequest genRequest
     * @returns BaseResponse_GenVideoResponse_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static generateVideoByTextUsingPost(
        genRequest: GenRequest,
    ): CancelablePromise<BaseResponse_GenVideoResponse_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/generate/video',
            body: genRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * generateVoiceByText
     * @param genRequest genRequest
     * @returns BaseResponse_GenVoiceResponse_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static generateVoiceByTextUsingPost(
        genRequest: GenRequest,
    ): CancelablePromise<BaseResponse_GenVoiceResponse_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/generate/voice',
            body: genRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
