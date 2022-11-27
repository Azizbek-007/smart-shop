import { role } from "../employees.enum";
export declare class UpdateDTO {
    employees_id: bigint;
    phone: string;
    avatar: string;
    name: string;
    password: string;
    role: role;
    pincode: string;
}
