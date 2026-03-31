import { Controller, Post, Body } from '@nestjs/common';
import { FakeUserDto } from './dto/fake-user.dto';

@Controller('bad')
export class BadPracticeController {
  
  @Post('create')
  createFakeUser(@Body() fakeUserDto: FakeUserDto) {
    // Mal: Uso severo de try-catch para un manejo común de errores
    // Mal: Lógica comercial (validación quemada) directamente en el controlador
    try {
      if (fakeUserDto.edad < 18) {
        throw new Error('Usuario es menor de edad'); // No usa HttpException de NestJS
      }
      
      // Simulación de guardado en la DB sin usar el patrón Repositorio delegado
      const userSaved = {
        id: Math.random(),
        ...fakeUserDto,
        status: 'Activo'
      };

      return {
        message: 'Usuario creado exitosamente',
        data: userSaved
      };
      
    } catch (error) {
      // Retorna un objeto genérico en lugar de delegar a ExceptionFilters
      return {
        success: false,
        message: 'Ocurrió un error inesperado',
        error: error.message
      };
    }
  }
}
