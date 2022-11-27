import { BaseEntity } from "typeorm";
import { role } from "./employees.enum";
export declare class employees extends BaseEntity {
    id: bigint;
    avatar: string;
    name: string;
    phone: string;
    password: string;
    pincode: string;
    salary: string;
    flex: string;
    role: role;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
