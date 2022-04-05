import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryColumn()
    uid: string

    @Column()
    nick: string;

    @Column({default: ""})
    cover: string;

    @Column({default: 1})
    level: number;


    @Column({default: 3200})
    money: number;
}