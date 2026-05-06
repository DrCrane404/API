import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';;
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto:LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  //Verificacion de funcionamiento correcto de token
  @UseGuards(AuthGuard)
  @Get('/profile')
  profile (@Request() req){
    return "Estas viendo un perfil protegido pro un Token valido del usuario" + req.user
  }

  //Funcion para solicitar restablecimiento de contraseña mediante pregunta de recuperacion
  @Post('forgot-password')
  forgot_Password(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  reset(@Body() body: { email: string, code:string, newPassword: string }) {
    return this.authService.resetPassword(body.email, body.code, body.newPassword);
  }

/*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
   }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
    }*/ 
}
