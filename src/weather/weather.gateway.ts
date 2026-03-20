import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherService } from './weather.service';
import { ApiTags } from '@nestjs/swagger';

/**
 * @WebSocketGateway() convierte esta clase en un Servidor de WebSockets (Socket.io).
 * El parámetro 'cors' asegura que clientes de distintos orígenes (por ej. frontend separado)
 * puedan conectarse. Aquí está abierto (*) por simplicidad.
 * @ApiTags('Weather Gateway') documenta a nivel general su categoría en Swagger (opcional para Gateways per se,
 * pero útil si la clase expusiera endpoints).
 */
@ApiTags('WebSocket Gateway')
@WebSocketGateway({ cors: { origin: '*' } })
export class WeatherGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // Instancia de nuestro servidor Socket.io inyectada
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WeatherGateway.name);

  // Inyección de dependencias: se inyecta el WeatherService para usar su lógica
  constructor(private readonly weatherService: WeatherService) {}

  /**
   * Ciclo de vida: cuando el gateway se inicializa correctamente
   */
  afterInit() {
    this.logger.log('WeatherGateway Initialized');
  }

  /**
   * Ciclo de vida: cuando un cliente se conecta
   */
  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
    // Podríamos emitir el clima inmediatamente al conectarse si lo deseamos
    this.emitWeatherUpdate();
  }

  /**
   * Ciclo de vida: cuando un cliente se desconecta
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  /**
   * @Cron() es un decorador de @nestjs/schedule.
   * Ejecuta esta función repetidamente según la expresión.
   * En este caso, CronExpression.EVERY_10_SECONDS ejecutará esta magia cada 10 segundos exactos.
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Ejecutando CronJob de 10 segundos');
    await this.emitWeatherUpdate();
  }

  /**
   * Función helper interna que obtiene el clima del servicio
   * y usa el servidor Socket.io para emitir ('emit()')
   * el evento 'weatherUpdate' a todos los clientes.
   */
  private async emitWeatherUpdate() {
    try {
        const weatherData = await this.weatherService.getCurrentWeather();
        
        // Emite el evento a *todos* los clientes conectados
        this.server.emit('weatherUpdate', weatherData);
        
        this.logger.debug(`Evento 'weatherUpdate' emitido con éxito -> ${weatherData.city}`);
    } catch (error) {
        this.logger.error('Error al emitir actualización climática', error);
    }
  }
}
