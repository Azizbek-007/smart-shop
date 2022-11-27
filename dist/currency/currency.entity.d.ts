import { BaseEntity } from "typeorm";
export declare class currencies extends BaseEntity {
    id: number;
    name: string;
    code: string;
    rate: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
