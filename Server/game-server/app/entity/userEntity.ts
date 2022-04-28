import {Column, Entity, PrimaryColumn} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm/browser";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    uid: number

    @Column({unique: true})
    aid: number

    @Column()
    nick: string;

    @Column({default: ""})
    cover: string;

    @Column({default: 1})
    level: number;


    @Column({default: 3200})
    money: number;
}