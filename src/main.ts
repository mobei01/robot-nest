import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置CORS
  const corsOptions: cors.CorsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // 允许携带cookie
  };

  app.enableCors(corsOptions);
  // 设置全局前缀
  app.setGlobalPrefix('api');
  await app.listen(3005);
}
bootstrap();
