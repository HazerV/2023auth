import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEnt {
    
    @PrimaryGeneratedColumn()
    userId: number

    @Column()
    username: string

    @Column()
    password: string
}
