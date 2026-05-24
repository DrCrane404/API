import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { TaskType } from "../../enum/task-type";

@Entity('tasks')
export class Task {

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({name:'user_id'})
    user!: User;
    @ManyToMany(() => User, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable({ name: 'task_members' })
    members!: User[];

    @PrimaryGeneratedColumn()
    task_id!:number

    @Column({length:20})
    title!:string

    @Column({length:150})
    description!:string

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
    completed!:Boolean

    @Column({type:Boolean, default:false})
    updated!:Boolean

    @Column({type:Boolean, default:false})
    public!:Boolean

    @Column({nullable:true})
    code!:String

}
