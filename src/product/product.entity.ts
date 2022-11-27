import { categories } from "src/category/categories.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: bigint;

    @ManyToOne((type) => categories, (category) => category.products, { eager: false })
    @JoinColumn({ name: "category_id" })
    category: categories;

    @Column()
    category_id: number;
    
    @Column({ nullable: true })
    image: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    brand: string;

    @Column({ type: 'json' })
    cost_price: object;

    @Column({ type: 'json' })
    min_price: object;

    @Column({ type: 'json' })
    max_price:object;

    @Column({ type: 'json' })
    whole_price: object;

    @Column({ nullable: true })
    uuid: string; 

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn() 
    deleted_at: Date;
}
