import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        nullable: false,
    })
    color: string;
}