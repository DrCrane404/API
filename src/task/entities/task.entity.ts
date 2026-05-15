import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { TaskType } from "../../enum/task-type";

@Entity('task')
export class Task {
    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({name:'user_id'})
    user!:User;

    @PrimaryGeneratedColumn()
    task_id!:number

    @Column()
    title!:string

    @Column({type:'enum', enum:TaskType})
    tType!:TaskType

    @Column()
    stressLevel!:number

    @CreateDateColumn({type:Date})
    postDate!:Date

    @Column({type:Date})
    startDate!:Date
        
    @Column({type:Date})
    finishDate!:Date

    @Column({type:Boolean, default:false})
    completed!:boolean

    @Column({type:Boolean, default:false})
    update!:Boolean
}
