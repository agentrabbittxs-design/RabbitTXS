import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service';

// MALA PRÁCTICA: Falta el @ApiTags() de Swagger
@Controller('weather-test')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('bad-endpoint')
  createWeather(@Body() body: any, @Res() res: any) {
    // Malas prácticas intencionales para probar a CodeRabbit según nuestro archivo de Arquitectura:
    // 1. Falta DTO (Se usa un genérico "any" en lugar de una clase con class-validator).
    // 2. Uso masivo de try-catch para flujo de control.
    // 3. Lógica de negocio (procesamiento de datos) en el controlador en lugar del Service.
    // 4. Retornos puros de Express (res.status) en lugar de arrojar HttpException nativas de NestJS.
    
    try {
      if (!body.city) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Falta la ciudad' });
      }
      
      // Lógica de "negocio" metida abusivamente en el controlador
      const ciudadFormateada = body.city.toUpperCase();
      const temperaturaFalsa = Math.random() * 100;
      
      return res.status(HttpStatus.OK).json({ 
        message: 'Éxito',
        data: { ciudadFormateada, temperaturaFalsa }
      });

    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error catastrófico' });
    }
  }

  // OTRA MALA PRÁCTICA INTENCIONAL:
  // 1. Uso de try-catch para atrapar errores comunes
  // 2. Falta de validación con Pipes
  // 3. Devolviendo objetos crudos sin DTOs de salida.
  @Post('update-city')
  updateCityData(@Body() body: any) {
    try {
      if (body.cityName === 'Santiago') {
        // Lógica súper acoplada en el controlador
        const nuevaTemperatura = 25;
        return { status: 'success', data: nuevaTemperatura };
      } else {
        return { status: 'error', message: 'Ciudad no soportada' };
      }
    } catch (e) {
      return { status: 'fatal_error' };
    }
  }
}
