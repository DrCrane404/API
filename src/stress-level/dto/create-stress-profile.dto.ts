import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateStressProfileDto {
     @IsNumber()
    puntuacion!: number;
    
    @IsString()
    categoria!: string;        
    
    @IsNumber()
    puntajeTotal!: number;
    
    @IsNumber()
    puntajeMaximo!: number

    @IsNumber()
    @Min(0)
    @Max(24)
    horasSueno!: number;
}
