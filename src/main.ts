import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact(
      'Gustavo Teles',
      'https://www.linkedin.com/in/ustavoteles',
      'https://github.com/ustavoteles',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  //sincronizando o timezone com base no meridiano de greenwich
  process.env.TZ = '-03.00'; //horário de brasilia

  //habilitando globalmente a validação de dados
  app.useGlobalPipes(new ValidationPipe());

  //Cors vem de Cross Reaserching Origin
  // (em português, compartilhamento de recursos de origem cruzada)
  //o Cors é uma política de segurança
  //que impede que um site acesse recursos de outro site

  //Habilitando o Cors
  //faz com que a aplicação converse com outro servidor
  //recebendo requisições de outro
  app.enableCors();

  //configurando para o nest escutar a porta 4000
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
