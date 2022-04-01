import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryColumn()
    uid: string

    @Column()
    nick: string;
}