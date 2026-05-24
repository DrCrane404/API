import { IsNumber, IsString } from "class-validator";

export class CreateStressProfileDto {
     @IsNumber()
    puntuacion!: number;
    
    @IsString()
    categoria!: string;        
    
    @IsNumber()
    puntajeTotal!: number;
    
    @IsNumber()
    puntajeMaximo!: number
}
