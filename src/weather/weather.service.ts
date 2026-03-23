import { Injectable, Logger } from '@nestjs/common';
import { WeatherResponseDto } from './dto/weather.dto';

/**
 * @Injectable() es un decorador de NestJS que marca una clase como un "proveedor"
 * (provider). Esto significa que NestJS puede inyectar automáticamente 
 * esta clase donde sea requerida (por ejemplo, en el Gateway), 
 * aplicando el patrón de Inyección de Dependencias.
 */
@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  // Lista de ciudades mock predefinidas para simular variabilidad
  private readonly mockCities = [
    { city: 'Santiago', description: 'Despejado', minTemp: 10, maxTemp: 30, baseHumidity: 40 },
    { city: 'Buenos Aires', description: 'Nublado', minTemp: 15, maxTemp: 25, baseHumidity: 70 },
    { city: 'Lima', description: 'Llovizna leve', minTemp: 16, maxTemp: 22, baseHumidity: 85 },
    { city: 'Bogotá', description: 'Lluvioso', minTemp: 8, maxTemp: 18, baseHumidity: 75 },
    { city: 'Ciudad de México', description: 'Parcialmente nublado', minTemp: 12, maxTemp: 26, baseHumidity: 50 },
  ];

  /**
   * Obtiene los datos del clima actuales.
   * La estructura está pensada para ser asíncrona (Promise), 
   * de manera que esté lista para reemplazarse por una llamada con Axios (e.g. a OpenWeatherMap)
   * en el futuro.
   */
  async getCurrentWeather(): Promise<WeatherResponseDto> {
    try {
      /* 
       * TODO: En un escenario real con Axios, aquí se haría un HTTP GET:
       * const response = await this.httpService.axiosRef.get('https://api.openweathermap.org/data/2.5/weather?...');
       * return mapearRespuesta(response.data);
       */

      // --- Inicio de Simulación Mock ---
      // Seleccionamos una ciudad al azar
      const randomCity = this.mockCities[Math.floor(Math.random() * this.mockCities.length)];
      
      // Generamos variabilidad en temperatura y humedad
      const randomTemp = (Math.random() * (randomCity.maxTemp - randomCity.minTemp) + randomCity.minTemp);
      const randomHumidity = Math.min(100, Math.max(0, randomCity.baseHumidity + (Math.random() * 20 - 10)));

      const simulatedData: WeatherResponseDto = {
        city: randomCity.city,
        description: randomCity.description,
        temperature: parseFloat(randomTemp.toFixed(1)), // 1 decimal
        humidity: Math.round(randomHumidity), // Número entero
      };

      this.logger.debug(`Clima obtenido para ${simulatedData.city}: ${simulatedData.temperature}°C`);
      
      return simulatedData;
      // --- Fin de Simulación Mock ---

    } catch (error) {
      this.logger.error('Error obteniendo los datos del clima', error);
      throw error;
    }
  }
}
