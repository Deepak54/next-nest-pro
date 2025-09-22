import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common'; // <-- 1. Importe o ValidationPipe nativo
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Injetar o ConfigService para acessar as variáveis de ambiente
  const configService = app.get(ConfigService);

  // Configuração de Segurança (helmet)
  app.use(helmet());

  // Habilita o uso de cookies
  app.use(cookieParser());

  // Configuração de CORS (Cross-Origin Resource Sharing)
  app.enableCors({
    origin: (configService.get<string>('CORS_ORIGIN') ?? 'http://localhost:4200').split(','),
    credentials: true,
  });

  // 2. Usa o ValidationPipe global do NestJS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      transform: true,   // Transforma o payload para o tipo do DTO
      forbidNonWhitelisted: true, // Lança um erro se propriedades extras forem enviadas
    }),
  );

  // 3. Define um prefixo global para todas as rotas da API (boa prática)
  app.setGlobalPrefix('api');

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();