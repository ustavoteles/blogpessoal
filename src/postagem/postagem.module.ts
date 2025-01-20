import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemController } from './controllers/postagem.controller';
import { PostagemService } from './services/postagem.service';
import { TemaModule } from '../tema/tema.module';
import { TemaService } from '../tema/services/tema.service';
import { TemaController } from '../tema/controllers/tema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], //importa o módulo TypeOrm configurado para a entidade Postagem
  controllers: [PostagemController, TemaController], //define como serão as requisições
  providers: [PostagemService, TemaService], // define como serão as ações dos dados
  exports: [TypeOrmModule], //exporta módulo que serão usados do typeorm
})
export class PostagemModule {}
