import { PartialType } from '@nestjs/mapped-types';
import { CreateStressProfileDto } from './create-stress-profile.dto';

export class UpdateStressLevelDto extends PartialType(CreateStressProfileDto) {}
