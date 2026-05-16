import { PartialType } from '@nestjs/mapped-types';
import { CreateStressLevelDto } from './create-stress-profile.dto';

export class UpdateStressLevelDto extends PartialType(CreateStressLevelDto) {}
