import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";

@Entity('stress_profile')
export class StressProfile {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'float' })
    puntuacion!: number;   
    
    @Column()
    categoria!: string;

    @Column({ type: 'float', default: 8 })
    horasSueno!: number;

    @Column()
    puntajeTotal!: number;

    @Column()
    puntajeMaximo!: number;

    @CreateDateColumn()
    creadoEn!: Date;
}
