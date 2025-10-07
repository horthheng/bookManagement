import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
app.useGlobalPipes(
  new ValidationPipe({
      whitelist: true, // removes any extra fields not in DTO
    forbidNonWhitelisted: true,  // throws error if unknown fields exist
    transform: true,             // automatically converts types (e.g., string → number)
  }),
);


  app.setGlobalPrefix('api');
  await app.listen(3000);
  console.log('Server running at http://localhost:3000/api');
}
bootstrap();
