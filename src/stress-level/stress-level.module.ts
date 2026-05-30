import { Module } from '@nestjs/common';
import { StressLevelService } from './stress-level.service';
import { StressLevelController } from './stress-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StressProfile } from './entities/stress_profile.entity';
import { Task } from '../task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StressProfile, Task])],
  controllers: [StressLevelController],
  providers: [StressLevelService],
})
export class StressLevelModule {}
