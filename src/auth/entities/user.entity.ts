import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../enum/role";
import { Task } from "../../task/entities/task.entity";

@Entity('users')
export class User{

    @ManyToMany(() => Task, (task) => task.users)
    tasks!: Task[];

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

    @Column({ type:'enum', enum:Role, default:Role.USER})
    role!:Role;
}
