import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WeatherService } from './weather.service';
export declare class WeatherGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly weatherService;
    server: Server;
    private readonly logger;
    constructor(weatherService: WeatherService);
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleCron(): Promise<void>;
    private emitWeatherUpdate;
}
