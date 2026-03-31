export class FakeUserDto {
    // Mal: No tiene decoradores de class-validator (ej. @IsString(), @IsNotEmpty())
    // Mal: No tiene @ApiProperty() a pesar de requerirse para Swagger
    nombre: string;
    
    edad: number;
    
    correo: string;
}
