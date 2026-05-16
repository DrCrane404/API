import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { TaskType } from "../../enum/task-type";

@Entity('task')
export class Task {
    @ManyToMany(() => User, (user) => user.tasks)
    @JoinTable({
        name:'user_task',
        joinColumn: {name: 'task_id', referencedColumnName: 'task_id'},
        inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
    })
    users!:User[];

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
