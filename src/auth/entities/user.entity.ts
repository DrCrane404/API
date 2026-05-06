import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    name!:string;
    @Column({unique:true , length:20})
    username!:string;
    @Column()
    email!:string;
    @Column()
    password!:string;
    @Column({ nullable:true})
    resetCode?:string;
    @Column({ type:'datetime', nullable:true})
    resetCodeExpire?:Date;
}
