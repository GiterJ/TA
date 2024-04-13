/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BottleVO } from './BottleVO';
import type { OrderItem } from './OrderItem';
export type Page_BottleVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<BottleVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

