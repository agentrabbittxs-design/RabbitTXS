import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherGateway } from './weather.gateway';

/**
 * @Module() agrupa un conjunto cohesivo de componentes (controladores, servicios, gateways)
 * que están estrechamente relacionados en un mismo dominio (Clima).
 */
@Module({
  providers: [WeatherService, WeatherGateway],
})
export class WeatherModule {}
