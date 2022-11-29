import { BaseEntity } from "typeorm";
import { UserEnum } from "./usertype.enum";
export declare class users extends BaseEntity {
    id: bigint;
    full_name: string;
    phone: string;
    type: UserEnum;
    tin: string;
    balance: number;
    about: string;
    registered_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
