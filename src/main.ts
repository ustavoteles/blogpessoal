import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //sincronizando o timezone com base no meridiano de greenwich
  process.env.TZ = '-03.00'; //horário de brasilia

  //habilitando globalmente a validação de dados
  app.useGlobalPipes(new ValidationPipe());

  //Cors vem de Cross Reaserching Origin
  // (em português, compartilhamento de recursos de origem cruzada)
  //o Cors é uma política de segurança
  //que impede que um site acesse recursos de outro site

  //Habilitando o Cors
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
