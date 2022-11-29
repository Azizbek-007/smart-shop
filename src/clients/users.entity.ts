import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEnum } from "./usertype.enum";

@Entity()
export class users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    full_name: string;
    
    @Column({ unique: true})
    phone: string;
    
    @Column()
    type: UserEnum;
    
    @Column()
    tin: string;                                                                        
    
    @Column({nullable: true, default: 0})
    balance: number;
    
    @Column()
    about: string;

    @CreateDateColumn()
    registered_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
    
    @DeleteDateColumn()
    deleted_at: Date;
}