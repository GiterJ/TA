/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AIPersonInfo } from './AIPersonInfo';
import type { OrderItem } from './OrderItem';
export type Page_AIPersonInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<AIPersonInfo>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

