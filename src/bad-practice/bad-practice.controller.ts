import { Controller, Post, Body, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { BadPracticeDto } from './bad-practice.dto';

// Violación: Controlador sin @ApiTags()
// Violación: No se usa @Public() ni Guards para rutas públicas/privadas
@Controller('bad-practice')
export class BadPracticeController {
  
  // Violación: Sin DTO estricto o con uno vacío
  @Post()
  async createUser(@Body() body: any) {
    // Violación: Lógica de negocio directamente en el controlador (debe estar en el Service)
    const user = {
      id: Math.random(),
      username: body.username,
      email: body.email,
      createdAt: new Date(),
    };

    // Violación: "Quemando" credenciales o configuraciones en el código
    const dbPassword = "SuperSecretPassword123!"; 

    return {
      message: 'User created successfully',
      user,
      dbPassword
    };
  }

  @Post('with-dto')
  async createWithBadDto(@Body() dto: BadPracticeDto, @Res() res) {
    // Violación: Uso de try-catch para control de errores común en lugar de filtros globales y lanzar HttpException
    try {
      if (!dto.email) {
        throw new Error('Email is required');
      }

      // Lógica de negocio
      const result = `Usuario ${dto.username} creado`;
      return res.status(HttpStatus.CREATED).json({ result });
    } catch (error) {
      // Devolviendo un 500 a mano en lugar de dejar a NestJS manejarlo con Excepciones
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    // Violación: Lógica de negocio
    // Violación: no usar Pipes (debería ser ParseIntPipe si es numérico)
    if (id === '0') {
        // En lugar de throw new BadRequestException()
        return { error: 'Id no puede ser cero' }; 
    }
    
    return { id, name: 'Test User' };
  }
}
