import { product } from "src/product/product.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class categories extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    name: string;

    @Column('double')
    min_percent: number;

    @Column('double')
    max_percent: number;

    @Column('double')
    whole_percent: number;

    @Column('double')
    min_product: number;
 
    @OneToMany((type) => product, (Product) => Product.category)
    products: product[];
      
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 

    @DeleteDateColumn()
    deleted_at: Date;
}