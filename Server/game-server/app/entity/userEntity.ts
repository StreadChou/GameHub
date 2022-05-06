import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    uid: number

    @Column({unique: true, type: "bigint"})
    aid: number

    @Column()
    nick: string;

    @Column({default: ""})
    cover: string;

    @Column({default: 1})
    level: number;

    @Column({default: 0})
    money: number;

    @Column({default: 0})
    gold: number;
}