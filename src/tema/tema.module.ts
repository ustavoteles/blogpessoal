import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';
import { TemaService } from './services/tema.service';
import { TemaController } from './controllers/tema.controller';

@Module({
  //decorator que define a classe como um módulo, que é um agrupamento de controllers, providers e módulos relacionados
  imports: [TypeOrmModule.forFeature([Tema])], //importa o módulo TypeOrm e define quais entidades serão utilizadas
  providers: [TemaService],
  controllers: [TemaController],
  exports: [TypeOrmModule],
})
export class TemaModule {} //exporta o módulo para ser utilizado em outros módulos
