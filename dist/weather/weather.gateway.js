"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WeatherGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const schedule_1 = require("@nestjs/schedule");
const weather_service_1 = require("./weather.service");
const swagger_1 = require("@nestjs/swagger");
let WeatherGateway = WeatherGateway_1 = class WeatherGateway {
    weatherService;
    server;
    logger = new common_1.Logger(WeatherGateway_1.name);
    constructor(weatherService) {
        this.weatherService = weatherService;
    }
    afterInit() {
        this.logger.log('WeatherGateway Initialized');
    }
    handleConnection(client) {
        this.logger.log(`Cliente conectado: ${client.id}`);
        this.emitWeatherUpdate();
    }
    handleDisconnect(client) {
        this.logger.log(`Cliente desconectado: ${client.id}`);
    }
    async handleCron() {
        this.logger.debug('Ejecutando CronJob de 10 segundos');
        await this.emitWeatherUpdate();
    }
    async emitWeatherUpdate() {
        try {
            const weatherData = await this.weatherService.getCurrentWeather();
            this.server.emit('weatherUpdate', weatherData);
            this.logger.debug(`Evento 'weatherUpdate' emitido con éxito -> ${weatherData.city}`);
        }
        catch (error) {
            this.logger.error('Error al emitir actualización climática', error);
        }
    }
};
exports.WeatherGateway = WeatherGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WeatherGateway.prototype, "server", void 0);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WeatherGateway.prototype, "handleCron", null);
exports.WeatherGateway = WeatherGateway = WeatherGateway_1 = __decorate([
    (0, swagger_1.ApiTags)('WebSocket Gateway'),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } }),
    __metadata("design:paramtypes", [weather_service_1.WeatherService])
], WeatherGateway);
//# sourceMappingURL=weather.gateway.js.map