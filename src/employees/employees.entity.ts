import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { role } from "./employees.enum";

@Entity()
export class employees extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    avatar: string;

    @Column({ nullable: false})
    name: string;

    @Column({ nullable: false, unique: true })
    phone: string;
    
    @Column({ nullable: false })
    password: string;
    
    @Column({ nullable: false })
    pincode: string;

    @Column({ nullable: false })
    salary: string;
    
    @Column({ nullable: false })
    flex: string;
    
    @Column()
    role: role; 
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
    
    @DeleteDateColumn()
    deleted_at: Date;
}

