import { WeatherResponseDto } from './dto/weather.dto';
export declare class WeatherService {
    private readonly logger;
    private readonly mockCities;
    getCurrentWeather(): Promise<WeatherResponseDto>;
}
