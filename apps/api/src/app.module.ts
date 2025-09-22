import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- 1. Importe
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 2. Carrega as variáveis de ambiente do arquivo .env
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigService disponível globalmente
    }),
    
    // 3. Usa o ConfigService para se conectar ao Mongoose de forma assíncrona
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
    }),

    // 4. Configuração do Throttler (limitador de requisições)
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minuto
        limit: 100, // 100 requisições por minuto por IP
      },
    ]),

    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Aplica o limitador de requisições globalmente
    },
  ],
})
export class AppModule {}
