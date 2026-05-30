import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStressProfileDto } from './dto/create-stress-profile.dto';
import { UpdateStressLevelDto } from './dto/update-stress-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StressProfile } from './entities/stress_profile.entity';
import { Repository } from 'typeorm';
import { Task } from '../task/entities/task.entity';

@Injectable()
export class StressLevelService {

  constructor(
        @InjectRepository(StressProfile)
        private stressRepo: Repository<StressProfile>,
        @InjectRepository(Task)
        private taskRepo: Repository<Task>
    ) {}

  async crearPerfil(dto: CreateStressProfileDto, userId: number) {

    const existe = await this.stressRepo.findOne({ 
        where: { user: { id: userId } } 
    });
    if (existe) throw new ConflictException('El cuestionario inicial ya fue completado');

    const perfil = this.stressRepo.create({
        ...dto,
        user: { id: userId }
    });
    return this.stressRepo.save(perfil);
  }

  async obtenerNivel(userId: number) {
      const perfil = await this.stressRepo.findOne({ 
          where: { user: { id: userId } } 
      });
      if(!perfil) return { existe:false};   // null = aún no completó el cuestionario
      
      // Obtener tareas activas del usuario
      const tareas = await this.taskRepo
          .createQueryBuilder('task')
          .leftJoin('task.user', 'user')
          .leftJoin('task.members', 'members')
          .where('user.id = :id', { id: userId })
          .orWhere('members.id = :id', { id: userId })
          .andWhere('task.completed = false')
          .getMany();

      // Promedio de estrés de tareas activas (escala 0-10)
      const promedioTareas = tareas.length > 0
          ? tareas.reduce((sum, t) => sum + t.stressLevel, 0) / tareas.length
          : 0;

      // Nivel final: 60% cuestionario + 40% tareas
      const nivelFinal = (perfil.puntuacion * 0.6) + (promedioTareas * 0.4);

      return {
          existe: true,
          puntuacion: perfil.puntuacion,
          categoria: perfil.categoria,
          nivelFinal: Math.round(nivelFinal * 10) / 10,
          impactoTareas: Math.round(promedioTareas * 10) / 10
      };
  }

  findAll() {
    return `This action returns all stressLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stressLevel`;
  }

  update(id: number, updateStressLevelDto: UpdateStressLevelDto) {
    return `This action updates a #${id} stressLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} stressLevel`;
  }
}
