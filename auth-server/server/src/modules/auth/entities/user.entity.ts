import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({unique: true, length: 15})
    username: string;

    @Column({length: 255})
    password: string;

    @Column({length: 30})
    phone: string;

    @Column({nullable: true})
    cover: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
