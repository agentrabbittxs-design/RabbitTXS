export class BadPracticeDto {
  // Violación: Sin @ApiProperty() ni class-validator (@IsString(), @IsNotEmpty(), etc.)
  username: string;
  email: string;
  age: number;
}
