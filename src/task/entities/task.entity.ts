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

    @Column({ type: 'float', default: 0 })
    horasDia!: number;

    @CreateDateColumn({type:'date'})
    postDate!:Date

    @Column({type:'date'})
    startDate!:Date

    @Column({type:'date'})
    finishDate!:Date

    @Column({type:'boolean', default:false})
    completed!:boolean

    @Column({type:'boolean', default:false})
    updated!:boolean

    @Column({type:'boolean', default:false})
    public!:boolean

    @Column({nullable:true})
    code!:string

}
