import { Module } from '@nestjs/common';
import { StressLevelService } from './stress-level.service';
import { StressLevelController } from './stress-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StressProfile } from './entities/stress_profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StressProfile])],
  controllers: [StressLevelController],
  providers: [StressLevelService],
})
export class StressLevelModule {}
