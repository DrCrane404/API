import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStressProfileDto } from './dto/create-stress-profile.dto';
import { UpdateStressLevelDto } from './dto/update-stress-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StressProfile } from './entities/stress_profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StressLevelService {

  constructor(
        @InjectRepository(StressProfile)
        private stressRepo: Repository<StressProfile>
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
      return perfil ?? null;   // null = aún no completó el cuestionario
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
