import { Module } from '@nestjs/common';
import { BadPracticeController } from './bad-practice.controller';

@Module({
  // Violación: Falta la capa de Service, todo está en el controller.
  controllers: [BadPracticeController],
  providers: [],
})
export class BadPracticeModule {}
