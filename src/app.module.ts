import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    // Se importa ScheduleModule de uso global para los CronJobs
    ScheduleModule.forRoot(),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
