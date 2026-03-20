"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WeatherService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
let WeatherService = WeatherService_1 = class WeatherService {
    logger = new common_1.Logger(WeatherService_1.name);
    mockCities = [
        { city: 'Santiago', description: 'Despejado', minTemp: 10, maxTemp: 30, baseHumidity: 40 },
        { city: 'Buenos Aires', description: 'Nublado', minTemp: 15, maxTemp: 25, baseHumidity: 70 },
        { city: 'Lima', description: 'Llovizna leve', minTemp: 16, maxTemp: 22, baseHumidity: 85 },
        { city: 'Bogotá', description: 'Lluvioso', minTemp: 8, maxTemp: 18, baseHumidity: 75 },
        { city: 'Ciudad de México', description: 'Parcialmente nublado', minTemp: 12, maxTemp: 26, baseHumidity: 50 },
    ];
    async getCurrentWeather() {
        try {
            const randomCity = this.mockCities[Math.floor(Math.random() * this.mockCities.length)];
            const randomTemp = (Math.random() * (randomCity.maxTemp - randomCity.minTemp) + randomCity.minTemp);
            const randomHumidity = Math.min(100, Math.max(0, randomCity.baseHumidity + (Math.random() * 20 - 10)));
            const simulatedData = {
                city: randomCity.city,
                description: randomCity.description,
                temperature: parseFloat(randomTemp.toFixed(1)),
                humidity: Math.round(randomHumidity),
            };
            this.logger.debug(`Clima obtenido para ${simulatedData.city}: ${simulatedData.temperature}°C`);
            return simulatedData;
        }
        catch (error) {
            this.logger.error('Error obteniendo los datos del clima', error);
            throw error;
        }
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = WeatherService_1 = __decorate([
    (0, common_1.Injectable)()
], WeatherService);
//# sourceMappingURL=weather.service.js.map