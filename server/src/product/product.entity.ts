import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        unique: true
    })
    code: string;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false
    })
    description: string;

    @Column({
        nullable: false
    })
    price: number;

    @Column({
        nullable: false
    })
    quantity: number;

    @Column({
        nullable: true
    })
    image: string;
}