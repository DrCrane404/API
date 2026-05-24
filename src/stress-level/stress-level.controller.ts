import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { StressLevelService } from './stress-level.service';
import { CreateStressProfileDto } from './dto/create-stress-profile.dto';
import { UpdateStressLevelDto } from './dto/update-stress-level.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('stress-level')
export class StressLevelController {
  constructor(private readonly stressService: StressLevelService) {}

  // Guardar cuestionario inicial (solo se llama una vez)
  @UseGuards(AuthGuard)
  @Post('inicial')
  crearPerfil(@Body() dto: CreateStressProfileDto, @Request() req) {
      return this.stressService.crearPerfil(dto, req.user.id);
  }

  // Obtener nivel actual del usuario
  @UseGuards(AuthGuard)
  @Get('nivel')
  async obtenerNivel(@Request() req) {
    const perfil = await this.stressService.obtenerNivel(req.user.id);
    return perfil ?? { existe: false };  // nunca regresa vacío
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStressLevelDto: UpdateStressLevelDto) {
    return this.stressService.update(+id, updateStressLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stressService.remove(+id);
  }
}
