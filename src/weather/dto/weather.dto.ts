import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) que define la estructura de los datos del clima
 * que el backend enviará a los clientes conectados vía WebSockets.
 */
export class WeatherResponseDto {
  // @ApiProperty() es un decorador de @nestjs/swagger. 
  // Documenta este campo para que aparezca en la interfaz visual de Swagger,
  // describiendo el tipo de dato y un ejemplo representativo.
  @ApiProperty({ example: 24.5, description: 'Temperatura actual en grados Celsius' })
  temperature: number;

  @ApiProperty({ example: 60, description: 'Porcentaje de humedad relativa' })
  humidity: number;

  @ApiProperty({ example: 'Cielo despejado', description: 'Descripción textual de la condición climática' })
  description: string;

  @ApiProperty({ example: 'Santiago', description: 'Nombre de la ciudad' })
  city: string;
}
