import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEnum } from "./usertype.enum";

export class users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    full_name: string;
    
    @Column()
    phone: string;
    
    @Column()
    type: UserEnum;
    
    @Column()
    tin: number;
    
    @Column()
    balance: number;
    
    @Column()
    about: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
    
    @DeleteDateColumn()
    deleted_at: Date;
}